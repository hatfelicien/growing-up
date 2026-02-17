import { supabase } from './supabase.js';
import { content } from '../data/content.js';

const DB_NAME = 'GrowingUpDB';
const DB_VERSION = 1;
const STORE_NAME = 'modules';

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
    // Sync data from Supabase to local storage
    syncContent: async () => {
        let modulesData = [];
        try {
            const { data, error } = await supabase.from('modules').select('*');
            
            if (error) throw error;
            modulesData = data && data.length > 0 ? data : content.modules;
        } catch (error) {
            console.log('Offline or Supabase unreachable. Using static fallback.', error);
            modulesData = content.modules;
        }

        const db = await openDB();
        const tx = db.transaction(STORE_NAME, 'readwrite');
        const store = tx.objectStore(STORE_NAME);
        await store.clear();

        for (const module of modulesData) {
            store.put(module);
        }

        return modulesData;
    },

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

    login: async (username, password) => {
        const { data, error } = await supabase
            .from('users')
            .select('*')
            .eq('username', username)
            .eq('password', password)
            .single();

        if (data) {
            localStorage.setItem('adminToken', 'authenticated');
            return { success: true, token: 'authenticated' };
        }
        return { success: false };
    },

    addLesson: async (moduleId, lesson) => {
        const { data: module } = await supabase
            .from('modules')
            .select('lessons')
            .eq('id', moduleId)
            .single();

        const lessons = module?.lessons || [];
        lessons.push(lesson);

        const { error } = await supabase
            .from('modules')
            .update({ lessons })
            .eq('id', moduleId);

        return error ? { success: false } : { success: true, lesson };
    },

    deleteLesson: async (moduleId, lessonId) => {
        const { data: module } = await supabase
            .from('modules')
            .select('lessons')
            .eq('id', moduleId)
            .single();

        const lessons = module?.lessons.filter(l => l.id !== lessonId) || [];

        await supabase
            .from('modules')
            .update({ lessons })
            .eq('id', moduleId);

        return { success: true };
    },

    createModule: async (moduleData) => {
        const { error } = await supabase.from('modules').insert([moduleData]);
        return error ? { success: false } : { success: true };
    },

    updateModule: async (moduleId, updates) => {
        const { error } = await supabase
            .from('modules')
            .update(updates)
            .eq('id', moduleId);
        return error ? { success: false } : { success: true };
    },

    deleteModule: async (moduleId) => {
        await supabase.from('modules').delete().eq('id', moduleId);
        return { success: true };
    },

    updateLesson: async (moduleId, lessonId, updates) => {
        const { data: module } = await supabase
            .from('modules')
            .select('lessons')
            .eq('id', moduleId)
            .single();

        const lessons = module?.lessons?.map(l => 
            l.id === lessonId ? { ...l, ...updates } : l
        ) || [];

        const { error } = await supabase
            .from('modules')
            .update({ lessons })
            .eq('id', moduleId);

        return error ? { success: false } : { success: true };
    },

    getStats: async () => {
        try {
            const { data: modules } = await supabase.from('modules').select('*');
            const { data: users } = await supabase.from('users').select('*');
            
            const lessonCount = modules?.reduce((acc, m) => acc + (m.lessons?.length || 0), 0) || 0;
            
            return {
                modules: modules?.length || 0,
                lessons: lessonCount,
                users: users?.length || 0
            };
        } catch (e) {
            return null;
        }
    }
};
