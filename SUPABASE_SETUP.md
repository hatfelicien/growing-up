# Supabase Setup

## 1. Create Supabase Project
Go to https://supabase.com and create a free project

## 2. Create Tables

### users table
```sql
CREATE TABLE users (
  id BIGSERIAL PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

INSERT INTO users (username, password) VALUES ('admin', 'password123');
```

### modules table
```sql
CREATE TABLE modules (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  icon TEXT,
  color TEXT,
  lessons JSONB DEFAULT '[]'::jsonb,
  quiz JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);
```

## 3. Seed Initial Data
Run this in Supabase SQL Editor to insert default modules from content.js

## 4. Get API Keys
- Go to Project Settings > API
- Copy `Project URL` and `anon public` key

## 5. Add to Vercel
- Go to Vercel project settings
- Add environment variables:
  - `VITE_SUPABASE_URL`
  - `VITE_SUPABASE_ANON_KEY`

## 6. Local Development
Create `.env` file:
```
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key
```
