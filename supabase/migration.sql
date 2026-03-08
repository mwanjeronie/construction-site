-- ============================================================
-- BuildRight Uganda – Supabase SQL Migration
-- Run once in: Supabase Dashboard → SQL Editor → New query
-- Safe to re-run (uses IF NOT EXISTS / ON CONFLICT / DROP IF EXISTS)
-- ============================================================

-- 1. Create table
CREATE TABLE IF NOT EXISTS site_config (
  id         INTEGER PRIMARY KEY DEFAULT 1,
  config     JSONB NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT single_row CHECK (id = 1)
);

-- 2. Seed with initial data (skipped if row already exists)
INSERT INTO site_config (id, config)
VALUES (1, $json${
  "company_name": "BuildRight Uganda Ltd",
  "tagline": "Building Uganda's Future, One Structure at a Time",
  "logo_url": "/images/logo.png",
  "favicon_url": "/favicon.ico",
  "contact": {
    "phone": "+256 700 000 000",
    "email": "info@buildrightuganda.com",
    "address": "Plot 45, Kampala Road, Kampala, Uganda",
    "map_url": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d127672.6435747659!2d32.51633414036462!3d0.3161038012803655!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x177dbb0f04b0ca4d%3A0xdf0cf1de68e8f09e!2sKampala%2C%20Uganda!5e0!3m2!1sen!2sug!4v1709000000000!5m2!1sen!2sug",
    "whatsapp": "+256700000000"
  },
  "social_links": {
    "facebook": "https://facebook.com",
    "twitter": "https://twitter.com",
    "linkedin": "https://linkedin.com",
    "youtube": ""
  },
  "hero": {
    "title": "Building Uganda's Future",
    "subtitle": "Premium construction services across Uganda — residential, commercial, and infrastructure projects delivered with excellence and precision.",
    "cta_text": "Get a Free Quote",
    "cta_link": "/contact",
    "background_image": "/images/1.jpeg"
  },
  "services": [
    {"id": "1", "title": "Residential Construction", "description": "Custom homes, villas, and residential complexes built to the highest standards using quality materials and expert craftsmanship.", "icon": "FaHome", "image": "/images/2.jpeg"},
    {"id": "2", "title": "Commercial Buildings", "description": "Office complexes, retail spaces, warehouses, and commercial infrastructure designed for modern Uganda's growing economy.", "icon": "FaBuilding", "image": "/images/3.jpeg"},
    {"id": "3", "title": "Road & Civil Works", "description": "Roads, bridges, drainage systems, and civil engineering projects connecting communities across the country.", "icon": "FaRoad", "image": "/images/4.jpeg"},
    {"id": "4", "title": "Renovation & Remodeling", "description": "Transform existing structures with expert renovation and remodeling services that breathe new life into your property.", "icon": "FaTools", "image": "/images/5.jpeg"}
  ],
  "about": {
    "title": "About BuildRight Uganda",
    "subtitle": "Uganda's Trusted Construction Partner Since 2010",
    "content": "BuildRight Uganda Ltd has been at the forefront of construction and infrastructure development in Uganda since 2010. We are committed to delivering high-quality construction projects that meet international standards while supporting local communities and employment.",
    "image": "/images/6.jpeg",
    "mission": "To deliver world-class construction services that transform communities and drive economic growth across Uganda.",
    "vision": "To be East Africa's most trusted and innovative construction company by 2030.",
    "founded": "2010",
    "employees": "200+"
  },
  "projects": [
    {"id": "1", "title": "Kampala Office Complex",          "image": "/images/1.jpeg", "description": "A modern 10-story office complex in the heart of Kampala, featuring state-of-the-art facilities and sustainable design.",                            "category": "Commercial",     "year": "2023"},
    {"id": "2", "title": "Residential Estate — Entebbe",   "image": "/images/2.jpeg", "description": "50-unit residential estate with modern amenities, landscaped gardens, and security systems.",                                                      "category": "Residential",    "year": "2022"},
    {"id": "3", "title": "Jinja Bridge Rehabilitation",    "image": "/images/3.jpeg", "description": "Critical infrastructure rehabilitation project on the Nile corridor, enhancing connectivity for Eastern Uganda.",                                  "category": "Infrastructure", "year": "2023"},
    {"id": "4", "title": "Mbarara Shopping Mall",          "image": "/images/4.jpeg", "description": "Western Uganda's premier shopping destination spanning 15,000 sqm with over 80 retail units.",                                                    "category": "Commercial",     "year": "2022"},
    {"id": "5", "title": "School Construction — Gulu",     "image": "/images/5.jpeg", "description": "Modern educational facility serving 2,000+ students with classrooms, labs, sports grounds, and dormitories.",                                     "category": "Education",      "year": "2021"},
    {"id": "6", "title": "Hotel Construction — Fort Portal","image": "/images/6.jpeg", "description": "4-star hotel nestled in the scenic Tooro region, designed to attract tourism and boost the local economy.",                                       "category": "Hospitality",    "year": "2023"}
  ],
  "footer": {
    "copyright": "© 2024 BuildRight Uganda Ltd. All rights reserved.",
    "hours": "Mon – Fri: 8:00 AM – 6:00 PM | Sat: 9:00 AM – 2:00 PM",
    "tagline": "Building quality structures that stand the test of time across Uganda."
  },
  "stats": [
    {"label": "Projects Completed",    "value": "500+"},
    {"label": "Years of Experience",   "value": "14+"},
    {"label": "Expert Team Members",   "value": "200+"},
    {"label": "Happy Clients",         "value": "350+"}
  ],
  "team": [
    {"id": "1", "name": "Robert Kato",     "role": "Chief Executive Officer", "image": ""},
    {"id": "2", "name": "Sarah Namutebi", "role": "Head of Engineering",     "image": ""},
    {"id": "3", "name": "James Okello",   "role": "Project Manager",         "image": ""}
  ]
}$json$::JSONB)
ON CONFLICT (id) DO NOTHING;

-- 3. Enable Row Level Security
ALTER TABLE site_config ENABLE ROW LEVEL SECURITY;

-- 4. Allow the service role (used by the app) full access
DROP POLICY IF EXISTS "Service role has full access" ON site_config;
CREATE POLICY "Service role has full access"
  ON site_config
  FOR ALL
  USING (true)
  WITH CHECK (true);
