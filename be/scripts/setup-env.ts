import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

const __dirname = path.resolve()

const envPath = path.resolve(__dirname, './.env');
if (!fs.existsSync(envPath)) {
  console.error(`❌ .env file not found at ${envPath}`);
  process.exit(1);
}

dotenv.config({ path: envPath });

const requiredVars = [
  'SUPABASE_URL',
  'SUPABASE_ANON_KEY',
  'SUPABASE_SERVICE_ROLE_KEY',
  'PORT',
];

console.log('🔍 Validating required environment variables...\n');

let allValid = true;

for (const key of requiredVars) {
  if (!process.env[key]) {
    console.error(`❌ Missing env var: ${key}`);
    allValid = false;
  } else {
    console.log(`✅ ${key}`);
  }
}

if (!allValid) {
  console.error('\n⚠️ Missing one or more required variables. Please update your .env file.');
  process.exit(1);
}

console.log('\n✅ All required environment variables are present.');
