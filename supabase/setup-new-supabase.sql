-- Run once in a NEW Supabase project: SQL Editor -> paste -> Run

-- Create blog posts table for news
CREATE TABLE public.blog_posts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  excerpt TEXT,
  content TEXT NOT NULL,
  cover_image TEXT,
  author TEXT,
  published_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  is_published BOOLEAN DEFAULT false,
  language TEXT DEFAULT 'en' CHECK (language IN ('en', 'sl'))
);

-- Enable Row Level Security
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access to published posts
CREATE POLICY "Anyone can view published blog posts"
ON public.blog_posts
FOR SELECT
USING (is_published = true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_blog_posts_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_blog_posts_updated_at
BEFORE UPDATE ON public.blog_posts
FOR EACH ROW
EXECUTE FUNCTION public.update_blog_posts_updated_at();

-- Create index for better performance
CREATE INDEX idx_blog_posts_published ON public.blog_posts(published_at DESC) WHERE is_published = true;
CREATE INDEX idx_blog_posts_slug ON public.blog_posts(slug);
CREATE INDEX idx_blog_posts_language ON public.blog_posts(language);

-- Allow authenticated users to manage blog posts
CREATE POLICY "Authenticated users can insert blog posts"
ON public.blog_posts
FOR INSERT
TO authenticated
WITH CHECK (true);

CREATE POLICY "Authenticated users can update blog posts"
ON public.blog_posts
FOR UPDATE
TO authenticated
USING (true);

CREATE POLICY "Authenticated users can delete blog posts"
ON public.blog_posts
FOR DELETE
TO authenticated
USING (true);

-- Remove RLS policies for authenticated users since management will be done directly in Supabase
DROP POLICY IF EXISTS "Authenticated users can insert blog posts" ON public.blog_posts;
DROP POLICY IF EXISTS "Authenticated users can update blog posts" ON public.blog_posts;
DROP POLICY IF EXISTS "Authenticated users can delete blog posts" ON public.blog_posts;

-- Keep only the public read policy for published posts
-- (The "Anyone can view published blog posts" policy remains)

-- Posts copied from the old Lovable Cloud database
INSERT INTO public.blog_posts (id, title, slug, excerpt, content, cover_image, author, published_at, created_at, updated_at, is_published, language) VALUES ('10ed9ace-1e63-4083-bcb8-edb6ee19a976', 'Welcome to BEST Maribor', 'welcome-to-best-maribor', 'We are excited to launch our new website and share our journey with you.', '<p>We are thrilled to announce the launch of our new BEST Maribor website! This platform will serve as a hub for all our activities, events, and news.</p><p>As one of the 93 local BEST groups across Europe, we are committed to providing students with opportunities for personal and professional growth through academic courses, career fairs, hackathons, and international exchanges.</p><p>Stay tuned for upcoming events and opportunities!</p>', '/images/hero.jpg', 'BEST Maribor Team', '2025-01-15T10:00:00+00:00', '2025-10-16T17:10:40.954932+00:00', '2025-10-21T09:18:02.425612+00:00', true, 'en');
INSERT INTO public.blog_posts (id, title, slug, excerpt, content, cover_image, author, published_at, created_at, updated_at, is_published, language) VALUES ('f30f2152-0900-4267-8609-860f95f86410', 'Upcoming Robotics Course', 'upcoming-robotics-course', 'Join us for an intensive 5-day course on robotics and automation.', '<p>We are excited to announce our upcoming Robotics & Automation course! This hands-on training will cover modern robotics systems, automation technologies, and practical programming skills.</p><p><strong>Course Details:</strong></p><ul><li>Duration: 5 days</li><li>Level: Intermediate</li><li>Hands-on workshops with real robots</li><li>Company visits to local tech firms</li><li>Networking with industry professionals</li></ul><p>Registration opens soon. Don''t miss this opportunity to enhance your technical skills!</p>', '/images/hero.jpg', 'Course Team', '2025-01-10T14:00:00+00:00', '2025-10-16T17:10:40.954932+00:00', '2025-10-21T09:18:09.980514+00:00', true, 'en');
INSERT INTO public.blog_posts (id, title, slug, excerpt, content, cover_image, author, published_at, created_at, updated_at, is_published, language) VALUES ('9e465b9e-2c28-4e3a-8ad3-a75dcb9b6733', 'Dobrodošli v BEST Maribor', 'dobrodosli-v-best-maribor', 'Veseli smo, da lahko predstavimo našo novo spletno stran in delimo našo zgodbo z vami.', '<p>Z veseljem naznanjamo lansiranje nove spletne strani BEST Maribor! Ta platforma bo služila kot središče za vse naše aktivnosti, dogodke in novice.</p><p>Kot ena od 93 lokalnih skupin BEST po Evropi smo zavezani k zagotavljanju priložnosti za osebni in profesionalni razvoj študentov skozi akademske tečaje, karierne sejme, hackathone in mednarodne izmenjave.</p><p>Ostanite z nami za prihajajoče dogodke in priložnosti!</p>', '/images/hero.jpg', 'Ekipa BEST Maribor', '2025-01-15T10:00:00+00:00', '2025-10-16T17:10:40.954932+00:00', '2025-12-10T09:07:22.46845+00:00', true, 'sl');
INSERT INTO public.blog_posts (id, title, slug, excerpt, content, cover_image, author, published_at, created_at, updated_at, is_published, language) VALUES ('7e056ec4-e940-40a0-93c0-78f729daa51f', 'Prihajajoči tečaj robotike', 'prihajajoči-tecaj-robotike', 'Pridružite se nam na intenzivnem 5-dnevnem tečaju o robotiki in avtomatizaciji.', '<p>Z veseljem naznanjamo naš prihajajoči tečaj Robotika in avtomatizacija! To praktično usposabljanje bo zajemalo sodobne robotske sisteme, tehnologije avtomatizacije in praktične veščine programiranja.</p><p><strong>Podrobnosti tečaja:</strong></p><ul><li>Trajanje: 5 dni</li><li>Nivo: Srednji</li><li>Praktične delavnice z resničnimi roboti</li><li>Obiski podjetij v lokalnih tehnoloških podjetjih</li><li>Mreženje s strokovnjaki iz industrije</li></ul><p>Prijave se bodo odprle kmalu. Ne zamudite te priložnosti za izboljšanje svojih tehničnih veščin!</p>', '/images/hero.jpg', 'Ekipa za tečaje', '2025-01-12T14:00:00+00:00', '2025-10-16T17:45:04.963681+00:00', '2025-12-10T09:07:11.526212+00:00', true, 'sl');
INSERT INTO public.blog_posts (id, title, slug, excerpt, content, cover_image, author, published_at, created_at, updated_at, is_published, language) VALUES ('360085c0-488f-40bc-abdc-2c3d885c23a7', 'BEST Study Exchange - Prijave odprte', 'best-study-exchange-prijave-odprte', 'Zdaj se lahko prijavite za spomladansko izmenjavo BSE 2025.', '<p>Prijave za spomladansko sezono BEST Study Exchange 2025 so zdaj odprte! To je vaša priložnost, da preživite 1-2 tedna na partnerski univerzi v Evropi.</p><p><strong>Destinacije vključujejo:</strong></p><ul><li>Tehnična univerza v Münchnu, Nemčija</li><li>Politehnika v Madridu, Španija</li><li>Tehnična univerza v Varšavi, Poljska</li><li>Tehnična univerza v Istanbulu, Turčija</li><li>In mnoge druge!</li></ul><p>Prijave se zaprejo 1. februarja. Prijavite se zgodaj, saj so mesta omejena!</p>', '/images/hero.jpg', 'Tim BSE', '2025-01-08T10:00:00+00:00', '2025-10-16T17:45:04.963681+00:00', '2025-12-10T09:07:13.174015+00:00', true, 'sl');
