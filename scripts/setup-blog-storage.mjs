import { createClient } from '@supabase/supabase-js';
import { readFileSync, existsSync } from 'fs';
import { resolve } from 'path';

function loadEnv() {
  const envPath = resolve(process.cwd(), '.env');
  if (!existsSync(envPath)) return {};
  const lines = readFileSync(envPath, 'utf8').split('\n');
  return Object.fromEntries(
    lines
      .filter((line) => line && !line.startsWith('#') && line.includes('='))
      .map((line) => {
        const idx = line.indexOf('=');
        return [line.slice(0, idx).trim(), line.slice(idx + 1).trim()];
      })
  );
}

const env = loadEnv();
const url = env.VITE_SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const serviceKey =
  env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !serviceKey) {
  console.error(
    'Missing credentials. Add these to .env:\n' +
      '  VITE_SUPABASE_URL=...\n' +
      '  SUPABASE_SERVICE_ROLE_KEY=...  (from Railway → Supabase stack → SERVICE_ROLE_KEY)'
  );
  process.exit(1);
}

const supabase = createClient(url, serviceKey);
const buckets = [
  { id: 'blog-images', public: true },
  { id: 'patterns-images', public: true },
];

for (const bucket of buckets) {
  const { data: existing } = await supabase.storage.getBucket(bucket.id);
  if (existing) {
    console.log(`✓ Bucket "${bucket.id}" already exists`);
    continue;
  }

  const { error } = await supabase.storage.createBucket(bucket.id, {
    public: bucket.public,
    fileSizeLimit: 10 * 1024 * 1024,
  });

  if (error) {
    console.error(`✗ Failed to create "${bucket.id}":`, error.message);
    process.exit(1);
  }

  console.log(`✓ Created bucket "${bucket.id}"`);
}

console.log('\nStorage is ready. Blog image uploads should work now.');
