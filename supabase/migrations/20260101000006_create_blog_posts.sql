-- Create blog_posts table (admin-managed)
CREATE TABLE IF NOT EXISTS blog_posts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    excerpt TEXT DEFAULT '',
    content TEXT DEFAULT '',
    author TEXT DEFAULT '',
    read_time TEXT DEFAULT '',
    image TEXT DEFAULT '',
    category TEXT DEFAULT '',
    tags JSONB DEFAULT '[]',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view blog_posts"
ON blog_posts FOR SELECT USING (true);

CREATE POLICY "Allow insert blog_posts"
ON blog_posts FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow update blog_posts"
ON blog_posts FOR UPDATE USING (true);

CREATE POLICY "Allow delete blog_posts"
ON blog_posts FOR DELETE USING (true);

CREATE TRIGGER update_blog_posts_updated_at
    BEFORE UPDATE ON blog_posts
    FOR EACH ROW
    EXECUTE PROCEDURE update_updated_at_column();
