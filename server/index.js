
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import db from './db.js';
import { content } from '../src/data/content.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
// Serve static files from the React app
app.use(express.static(join(__dirname, '../dist')));

// Seeding Script (Run once if DB is empty)
async function seedDatabase() {
    const moduleCount = await db.modules.count({});
    if (moduleCount === 0) {
        console.log('Seeding database...');
        for (const mod of content.modules) {
            // deep copy to avoid modifying original
            const moduleData = { ...mod };
            const lessons = moduleData.lessons;
            delete moduleData.lessons; // store lessons separately or embedded? 
            // For NeDB/Mongo, embedding is fine for this scale, but let's follow the plan if needed.
            // Actually, for simplicity in this prototype, let's keep lessons embedded in modules for now, 
            // matches the frontend structure perfectly.

            // Wait, looking at the plan, I said "modules.db" and "lessons.db". 
            // But separating them adds complexity to the "sync" logic. 
            // Let's stick to the structure of content.js for now: embedded lessons.

            // Re-attaching lessons for embedded storage
            moduleData.lessons = lessons;
            await db.modules.insert(moduleData);
        }

        // Default Admin User
        const adminUser = await db.users.findOne({ username: 'admin' });
        if (!adminUser) {
            await db.users.insert({ username: 'admin', password: 'password123' }); // Plaintext for prototype simplicity as requested? No, let's just do it.
        }
        console.log('Database seeded!');
    }
}

seedDatabase();

// --- API Endpoints ---

// Login
app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await db.users.findOne({ username, password });
    if (user) {
        res.json({ success: true, token: 'fake-jwt-token' });
    } else {
        res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
});

// Get All Data (Sync)
app.get('/api/data', async (req, res) => {
    const modules = await db.modules.find({});
    res.json({ modules });
});

// Add Lesson
app.post('/api/modules/:moduleId/lessons', async (req, res) => {
    const { moduleId } = req.params;
    const lesson = req.body;

    // Add ID if missing
    if (!lesson.id) lesson.id = Date.now().toString();

    const result = await db.modules.update(
        { id: moduleId },
        { $push: { lessons: lesson } }
    );

    if (result) {
        res.json({ success: true, lesson });
    } else {
        res.status(404).json({ success: false, message: 'Module not found' });
    }
});

// Add Module
app.post('/api/modules', async (req, res) => {
    const module = req.body;
    if (!module.id) module.id = module.title.toLowerCase().replace(/\s+/g, '-');
    if (!module.lessons) module.lessons = [];

    await db.modules.insert(module);
    await db.modules.insert(module);
    res.json({ success: true, module });
});

// Delete Lesson
app.delete('/api/modules/:moduleId/lessons/:lessonId', async (req, res) => {
    const { moduleId, lessonId } = req.params;

    // NeDB doesn't have a simple $pull for array of objects by ID in all versions/wrappers easily,
    // but we can do a find, filter, and update.
    const module = await db.modules.findOne({ id: moduleId });
    if (!module) return res.status(404).json({ success: false, message: 'Module not found' });

    const updatedLessons = module.lessons.filter(l => l.id !== lessonId);

    await db.modules.update(
        { id: moduleId },
        { $set: { lessons: updatedLessons } }
    );

    res.json({ success: true });
});

// Delete Module
app.delete('/api/modules/:moduleId', async (req, res) => {
    const { moduleId } = req.params;
    await db.modules.remove({ id: moduleId }, {});
    res.json({ success: true });
});

// Stats (Optional, or just calculate on frontend from all data)
app.get('/api/stats', async (req, res) => {
    const moduleCount = await db.modules.count({});
    const modules = await db.modules.find({});
    const lessonCount = modules.reduce((acc, m) => acc + (m.lessons ? m.lessons.length : 0), 0);
    const userCount = await db.users.count({});

    res.json({
        modules: moduleCount,
        lessons: lessonCount,
        users: userCount
    });
});

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
    res.sendFile(join(__dirname, '../dist/index.html'));
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
