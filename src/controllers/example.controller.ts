import { Request, Response } from 'express';
import { createExampleSchema, getExamplesQuerySchema } from '../validators/example.dto';
import { createExamplePrisma, getExamplesPrisma, createExampleMongo, getExamplesMongo } from '../services/example.service';
import { ApiResponse } from '../types/api';
import { AppError } from '../errors/AppError';

export async function createExample(req: Request, res: Response) {
  const parsed = createExampleSchema.safeParse(req.body);
  if (!parsed.success) throw new AppError('Invalid payload', 400);

  // Choose DB implementation: Prisma (Postgres) or Mongo
  const useMongo = Boolean(process.env.MONGO_URL);
  const result = useMongo ? await createExampleMongo(parsed.data) : await createExamplePrisma(parsed.data);

  const body: ApiResponse<typeof result> = { status: 'success', data: result };
  return res.status(201).json(body);
}

export async function listExamples(req: Request, res: Response) {
  const q = getExamplesQuerySchema.parse(req.query);
  const page = q.page ? Number(q.page) : 1;
  const limit = q.limit ? Number(q.limit) : 10;
  const useMongo = Boolean(process.env.MONGO_URL);
  const { items, total } = useMongo ? await getExamplesMongo(page, limit) : await getExamplesPrisma(page, limit);
  const body: ApiResponse<{ items: unknown[]; total: number }> = { status: 'success', data: { items, total } };
  return res.json(body);
}
