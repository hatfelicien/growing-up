
import Datastore from 'nedb-promises';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { tmpdir } from 'os';

const __dirname = dirname(fileURLToPath(import.meta.url));
const dbPath = process.env.VERCEL ? tmpdir() : join(__dirname, 'data');

// Initialize databases
const db = {
    users: Datastore.create({ filename: join(dbPath, 'users.db'), autoload: true }),
    modules: Datastore.create({ filename: join(dbPath, 'modules.db'), autoload: true }),
    lessons: Datastore.create({ filename: join(dbPath, 'lessons.db'), autoload: true })
};

export default db;
