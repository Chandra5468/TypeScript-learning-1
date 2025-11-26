import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.string().default('4000'),
  DATABASE_URL: z.string().optional(),
  MONGO_URL: z.string().optional()
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error('Invalid environment variables:', parsed.error.format());
  throw new Error('Invalid environment variables');
}

export const config = {
  env: parsed.data.NODE_ENV,
  port: Number(parsed.data.PORT),
  databaseUrl: parsed.data.DATABASE_URL,
  mongoUrl: parsed.data.MONGO_URL
};
