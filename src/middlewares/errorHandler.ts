import { Request, Response, NextFunction } from 'express';
import { AppError } from '../errors/AppError';
import { logger } from '../utils/logger';

export function errorHandler(err: unknown, req: Request, res: Response, next: NextFunction) {
  if (err instanceof AppError) {
    const body = {
      status: 'error',
      message: err.message
    } as const;

    logger.warn({ err }, 'Operational error');
    return res.status(err.statusCode).json(body);
  }

  logger.error({ err }, 'Unexpected error');
  return res.status(500).json({ status: 'error', message: 'Internal Server Error' });
}
