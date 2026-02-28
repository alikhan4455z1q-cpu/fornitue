import { defineConfig } from 'prisma/config';
import 'dotenv/config';

export default defineConfig({
  migrations: {
    seed: 'tsx prisma/seed.ts', // 👈 Add this line
  },
  datasource: {
    url: process.env.DATABASE_URL,
  },
});