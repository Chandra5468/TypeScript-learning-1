import { z } from 'zod';

export const createExampleSchema = z.object({
  name: z.string().min(1)
});

export const getExamplesQuerySchema = z.object({
  page: z.string().optional(),
  limit: z.string().optional()
});

export type CreateExampleDTO = z.infer<typeof createExampleSchema>;
