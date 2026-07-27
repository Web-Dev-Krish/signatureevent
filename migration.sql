-- ============================================================
-- Migration: adds columns/tables the admin panel needs but that
-- are missing from the live database. Safe to run multiple
-- times and safe to run on a database that already has some of
-- these tables — every statement is guarded with IF NOT EXISTS
-- so nothing existing is dropped or overwritten.
--
-- Run this in the Supabase SQL editor (Project -> SQL Editor ->
-- New query -> paste -> Run).
-- ============================================================

-- 1. Google Maps embed HTML for each venue.
--    Without this column, saving/editing a venue from the admin
--    panel fails whenever the "Google Maps HTML" field is filled
--    in, because the app tries to write a column that doesn't
--    exist yet.
ALTER TABLE venues ADD COLUMN IF NOT EXISTS map_html TEXT;

-- 2. Venue media (multiple images/videos per venue).
--    Needed for the "Manage Media" button in the admin Venues
--    section to actually persist added images.
CREATE TABLE IF NOT EXISTS venue_media (
    id SERIAL PRIMARY KEY,
    venue_id INTEGER REFERENCES venues(id) ON DELETE CASCADE,
    media_type TEXT NOT NULL CHECK (media_type IN ('image', 'video')),
    media_url TEXT NOT NULL,
    thumbnail_url TEXT,
    caption TEXT,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Venue availability (unavailable dates per venue).
--    Needed for the "Manage Availability" button in the admin
--    Venues section, and for the frontend venue page to show a
--    date as unavailable.
CREATE TABLE IF NOT EXISTS venue_availability (
    id SERIAL PRIMARY KEY,
    venue_id INTEGER REFERENCES venues(id) ON DELETE CASCADE,
    date DATE NOT NULL,
    reason TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(venue_id, date)
);

-- 4. Page media (birthday-mankameshwar, pool-vatika pages).
CREATE TABLE IF NOT EXISTS page_media (
    id SERIAL PRIMARY KEY,
    page_slug TEXT NOT NULL,
    media_type TEXT NOT NULL CHECK (media_type IN ('image', 'video')),
    media_url TEXT NOT NULL,
    thumbnail_url TEXT,
    caption TEXT,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Helpful indexes (safe no-ops if they already exist).
CREATE INDEX IF NOT EXISTS idx_venue_media_venue_id ON venue_media(venue_id);
CREATE INDEX IF NOT EXISTS idx_venue_availability_venue_id ON venue_availability(venue_id);
CREATE INDEX IF NOT EXISTS idx_page_media_page_slug ON page_media(page_slug);
