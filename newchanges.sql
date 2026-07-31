-- ============================================================
-- newchanges.sql
-- Contains database schema updates for catering packages and event categories.
-- Run this in the Supabase SQL editor.
-- ============================================================

-- 1. Catering Packages
CREATE TABLE IF NOT EXISTS catering_packages (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    price NUMERIC NOT NULL,
    description TEXT,
    features JSONB DEFAULT '[]'::jsonb,
    image_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Event Categories
CREATE TABLE IF NOT EXISTS event_categories (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL UNIQUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert default categories if they don't exist
INSERT INTO event_categories (name) VALUES 
('Wedding'), ('Reception'), ('Birthday'), ('Corporate'), ('Anniversary')
ON CONFLICT (name) DO NOTHING;
