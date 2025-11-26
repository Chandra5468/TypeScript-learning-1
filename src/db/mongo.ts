import mongoose from 'mongoose';
import { config } from '../config';
import { logger } from '../utils/logger';

export async function connectMongo() {
  if (!config.mongoUrl) {
    logger.warn('MONGO_URL not provided; skipping MongoDB connection.');
    return;
  }

  await mongoose.connect(config.mongoUrl);
  logger.info('Connected to MongoDB');
}

export { mongoose };
