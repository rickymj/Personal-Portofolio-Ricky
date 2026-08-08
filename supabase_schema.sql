-- ============================================================================
-- SQL SCHEMA UNTUK SUPABASE DATABASE (PORTOFOLIO RICKY MUHAMMAD JUFRIZAL)
-- Jalankan query ini di Supabase SQL Editor: https://supabase.com/dashboard/project/_/sql
-- ============================================================================

-- 1. Tabel Experiences (Pengalaman Kerja)
CREATE TABLE IF NOT EXISTS public.experiences (
  id TEXT PRIMARY KEY,
  company TEXT NOT NULL,
  org_suffix TEXT,
  role TEXT NOT NULL,
  type TEXT DEFAULT 'Full-time',
  department TEXT,
  date TEXT NOT NULL,
  badges JSONB DEFAULT '[]'::jsonb,
  bullets JSONB DEFAULT '[]'::jsonb,
  order_index INT DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Tabel Projects (Proyek & Studi Kasus)
CREATE TABLE IF NOT EXISTS public.projects (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  tags JSONB DEFAULT '[]'::jsonb,
  bullets JSONB DEFAULT '[]'::jsonb,
  image TEXT,
  image_caption TEXT,
  link TEXT,
  order_index INT DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Tabel Skills (Keahlian & Tools)
CREATE TABLE IF NOT EXISTS public.skills (
  id TEXT PRIMARY KEY,
  category TEXT NOT NULL,
  skills JSONB DEFAULT '[]'::jsonb,
  order_index INT DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Tabel Education (Pendidikan Formal)
CREATE TABLE IF NOT EXISTS public.education (
  id TEXT PRIMARY KEY,
  institution TEXT NOT NULL,
  period TEXT NOT NULL,
  degree TEXT NOT NULL,
  thesis TEXT,
  honors TEXT,
  order_index INT DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Tabel Certifications (Sertifikasi & Penghargaan)
CREATE TABLE IF NOT EXISTS public.certifications (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  issuer_date TEXT NOT NULL,
  icon TEXT DEFAULT 'check',
  "desc" TEXT,
  image TEXT,
  order_index INT DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. Enable Row Level Security (RLS) & Allow Public Read Access
ALTER TABLE public.experiences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.education ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.certifications ENABLE ROW LEVEL SECURITY;

-- Policy: Publik bisa baca (SELECT)
CREATE POLICY "Public Read Experiences" ON public.experiences FOR SELECT USING (true);
CREATE POLICY "Public Read Projects" ON public.projects FOR SELECT USING (true);
CREATE POLICY "Public Read Skills" ON public.skills FOR SELECT USING (true);
CREATE POLICY "Public Read Education" ON public.education FOR SELECT USING (true);
CREATE POLICY "Public Read Certifications" ON public.certifications FOR SELECT USING (true);

-- Policy: Anon / Authenticated bisa tulis (INSERT / UPDATE / DELETE) jika pakai anon key
CREATE POLICY "Anon Modify Experiences" ON public.experiences FOR ALL USING (true);
CREATE POLICY "Anon Modify Projects" ON public.projects FOR ALL USING (true);
CREATE POLICY "Anon Modify Skills" ON public.skills FOR ALL USING (true);
CREATE POLICY "Anon Modify Education" ON public.education FOR ALL USING (true);
CREATE POLICY "Anon Modify Certifications" ON public.certifications FOR ALL USING (true);

-- 7. Buat Storage Bucket Publik untuk Foto/Gambar
INSERT INTO storage.buckets (id, name, public) 
VALUES ('portfolio-images', 'portfolio-images', true)
ON CONFLICT (id) DO NOTHING;

-- Policy Storage: Publik bisa melihat dan upload gambar
CREATE POLICY "Public Access Storage" ON storage.objects FOR SELECT USING (bucket_id = 'portfolio-images');
CREATE POLICY "Public Upload Storage" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'portfolio-images');
