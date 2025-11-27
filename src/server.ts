import dotenv from "dotenv"
dotenv.config();

import { prisma } from './db/prisma';
import { app } from './app';
import { logger } from './utils/logger';

async function checkDbConnection(): Promise<boolean> {
  try {
    await prisma.$queryRaw`SELECT 1`;
    logger.info('Database connected successfully');
    return true;
  } catch (error) {
    logger.error('Database connection failed:', error);
    return false;
  }
}

async function start() {
  // Validate required env vars
  const port = Number(process.env.PORT) || 3000;
  if (!process.env.DATABASE_URL) {
    logger.error('DATABASE_URL environment variable is required');
    process.exit(1);
  }

  // Connect to database in all environments
  const isConnected = await checkDbConnection();
  if (!isConnected) {
    logger.error('Failed to connect to database');
    process.exit(1);
  }

  const server = app.listen(port, () => {
    logger.info(`Server running on port ${port}`);
  });

  // Graceful shutdown with timeout
  const shutdown = async (signal: string) => {
    logger.info(`Received ${signal}, shutting down gracefully...`);
    server.close(async (err) => {
      if (err) {
        logger.error('Server close error:', err);
        process.exit(1);
      }
      await prisma.$disconnect();
      logger.info('Server and database closed');
      process.exit(0);
    });

    // Force exit after 10s
    setTimeout(() => {
      logger.error('Force shutdown after timeout');
      process.exit(1);
    }, 10000);
  };

  process.on('SIGINT', () => shutdown('SIGINT'));
  process.on('SIGTERM', () => shutdown('SIGTERM'));
}

start().catch((error) => {
  logger.error('Failed to start server:', error);
  process.exit(1);
});
