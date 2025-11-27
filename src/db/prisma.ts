// src/db/prisma.ts
import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query'] : ['error'],
//   datasources:{
//     db:process.env.DATABASE_URL || "po",
//   }
});
