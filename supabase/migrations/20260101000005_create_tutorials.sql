-- Create tutorials table for video tutorials (admin-managed)
CREATE TABLE IF NOT EXISTS tutorials (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT DEFAULT '',
    duration TEXT DEFAULT '',
    skill_level TEXT DEFAULT 'Beginner' CHECK (skill_level IN ('Beginner', 'Intermediate', 'Advanced')),
    thumbnail TEXT DEFAULT '',
    video_url TEXT DEFAULT '',
    topics JSONB DEFAULT '[]',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Optional: enable RLS and add policies (adjust if you use Supabase Auth for admin)
ALTER TABLE tutorials ENABLE ROW LEVEL SECURITY;

-- Allow public read
CREATE POLICY "Public can view tutorials"
ON tutorials FOR SELECT
USING (true);

-- Allow all for insert/update/delete (admin is enforced in app; tighten with auth if needed)
CREATE POLICY "Allow insert tutorials"
ON tutorials FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow update tutorials"
ON tutorials FOR UPDATE USING (true);

CREATE POLICY "Allow delete tutorials"
ON tutorials FOR DELETE USING (true);

-- Trigger for updated_at
CREATE TRIGGER update_tutorials_updated_at
    BEFORE UPDATE ON tutorials
    FOR EACH ROW
    EXECUTE PROCEDURE update_updated_at_column();
