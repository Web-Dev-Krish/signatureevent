-- 1. Venues Table
CREATE TABLE venues (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    location TEXT NOT NULL,
    capacity INTEGER NOT NULL,
    price_per_day NUMERIC NOT NULL,
    rating NUMERIC DEFAULT 5.0,
    description TEXT,
    image_url TEXT,
    facilities JSONB DEFAULT '[]'::jsonb,
    event_types JSONB DEFAULT '[]'::jsonb
);

-- 2. Events Table
CREATE TABLE events (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    type TEXT NOT NULL,
    venue_name TEXT,
    date TIMESTAMPTZ NOT NULL,
    description TEXT,
    image_url TEXT,
    video_url TEXT
);

-- 3. Catering Items Table
CREATE TABLE catering_items (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    image_url TEXT,
    type TEXT NOT NULL
);

-- 4. Blogs Table
CREATE TABLE blogs (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    category TEXT NOT NULL,
    image_url TEXT,
    author TEXT NOT NULL,
    published_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Testimonials Table
CREATE TABLE testimonials (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    role TEXT,
    content TEXT NOT NULL,
    rating INTEGER DEFAULT 5
);

-- 6. Contact Messages Table
CREATE TABLE contact_messages (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    message TEXT NOT NULL,
    status TEXT DEFAULT 'new',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. Bookings Table
CREATE TABLE bookings (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    venue_id INTEGER REFERENCES venues(id) ON DELETE SET NULL,
    date TIMESTAMPTZ NOT NULL,
    guests INTEGER NOT NULL,
    status TEXT DEFAULT 'pending',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. Signature Events Table
CREATE TABLE signature_events (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    location TEXT NOT NULL,
    description TEXT,
    price NUMERIC NOT NULL,
    features JSONB DEFAULT '[]'::jsonb,
    image_url TEXT
);

-- 9. Gallery Table
CREATE TABLE gallery (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    image_url TEXT NOT NULL,
    category TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 10. Videos Table
CREATE TABLE videos (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    video_url TEXT NOT NULL,
    thumbnail_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 11. FAQs Table
CREATE TABLE faqs (
    id SERIAL PRIMARY KEY,
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 12. Venue Media Table (images and videos for venues)
CREATE TABLE venue_media (
    id SERIAL PRIMARY KEY,
    venue_id INTEGER REFERENCES venues(id) ON DELETE CASCADE,
    media_type TEXT NOT NULL CHECK (media_type IN ('image', 'video')),
    media_url TEXT NOT NULL,
    thumbnail_url TEXT,
    caption TEXT,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 13. Venue Availability Table (unavailable dates for venues)
CREATE TABLE venue_availability (
    id SERIAL PRIMARY KEY,
    venue_id INTEGER REFERENCES venues(id) ON DELETE CASCADE,
    date DATE NOT NULL,
    reason TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(venue_id, date)
);

-- 14. Page Media Table (for birthday-mankameshwar, pool-vatika pages)
CREATE TABLE page_media (
    id SERIAL PRIMARY KEY,
    page_slug TEXT NOT NULL,
    media_type TEXT NOT NULL CHECK (media_type IN ('image', 'video')),
    media_url TEXT NOT NULL,
    thumbnail_url TEXT,
    caption TEXT,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);
