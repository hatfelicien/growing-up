
const DB_NAME = 'GrowingUpDB';
const DB_VERSION = 1;
const STORE_NAME = 'modules';
import { content } from '../data/content.js';

// Initialize IndexedDB
const openDB = () => {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, DB_VERSION);

        request.onerror = () => reject(request.error);
        request.onsuccess = () => resolve(request.result);

        request.onupgradeneeded = (event) => {
            const db = event.target.result;
            if (!db.objectStoreNames.contains(STORE_NAME)) {
                db.createObjectStore(STORE_NAME, { keyPath: 'id' });
            }
        };
    });
};

export const api = {
    // ... (existing code)

    // Sync data from server to local storage
    syncContent: async () => {
        let modulesData = [];
        try {
            // 1. Try to fetch from server
            const response = await fetch('/api/data');
            if (!response.ok) throw new Error('Network response was not ok');

            const data = await response.json();
            modulesData = data.modules;

        } catch (error) {
            console.log('Offline or Server Unreachable. Using static fallback data.', error);
            // Fallback to static content
            modulesData = content.modules;
        }

        // 2. Save to IndexedDB (Always save whatever we got - server or static)
        const db = await openDB();
        const tx = db.transaction(STORE_NAME, 'readwrite');
        const store = tx.objectStore(STORE_NAME);

        // Clear old data? Or merge? For now, clear and replace to ensure consistency.
        await store.clear();

        for (const module of modulesData) {
            store.put(module);
        }

        return modulesData;
    },

    // Get modules (Offline-first strategy)
    getModules: async () => {
        const db = await openDB();
        return new Promise((resolve, reject) => {
            const tx = db.transaction(STORE_NAME, 'readonly');
            const store = tx.objectStore(STORE_NAME);
            const request = store.getAll();

            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    },

    // Admin Login
    login: async (username, password) => {
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });
        const data = await response.json();
        if (data.success) {
            localStorage.setItem('adminToken', data.token);
        }
        return data;
    },

    // Add Lesson (Online only for now)
    addLesson: async (moduleId, lesson) => {
        const response = await fetch(`/api/modules/${moduleId}/lessons`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // 'Authorization': `Bearer ${localStorage.getItem('adminToken')}` // Add if we implement middleware
            },
            body: JSON.stringify(lesson)
        });
        return await response.json();
    },

    // Delete Lesson
    deleteLesson: async (moduleId, lessonId) => {
        const response = await fetch(`/api/modules/${moduleId}/lessons/${lessonId}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }
        });
        return await response.json();
    },

    // Create Module
    createModule: async (moduleData) => {
        const response = await fetch('/api/modules', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(moduleData)
        });
        return await response.json();
    },

    // Delete Module
    deleteModule: async (moduleId) => {
        const response = await fetch(`/api/modules/${moduleId}`, {
            method: 'DELETE'
        });
        return await response.json();
    },

    // Get Stats
    getStats: async () => {
        try {
            const response = await fetch('/api/stats');
            return await response.json();
        } catch (e) {
            return null; // Offline
        }
    }
};
