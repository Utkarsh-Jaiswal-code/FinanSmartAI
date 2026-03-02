import dotenv from 'dotenv';
import { defineConfig } from 'drizzle-kit';

// load environment variables from .env.local or .env
dotenv.config({ path: '.env.local' });
dotenv.config();

export default defineConfig({
  out: './drizzle',
  schema: './utils/schema.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
});
