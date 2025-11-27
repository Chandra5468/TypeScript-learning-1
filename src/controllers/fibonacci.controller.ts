import { Request, Response } from 'express';
import { ApiResponse } from '../types/api';
import { AppError } from '../errors/AppError';
import { runFibWorker } from '../services/fibonaci.service';

export async function listExamples(req: Request, res: Response) {
//   const q = getExamplesQuerySchema.parse(req.query);
  const n = Number(req.params.n);

  try {
    const result = await runFibWorker(n);
    res.json({ input: n, result });
  } catch (err) {
    res.status(500).json({ error: "Worker thread failed" });
  }
//   const body: ApiResponse<{ items: unknown[]; total: number }> = { status: 'success', data: { items, total } };
//   return res.json(body);
}


/*
COMBINING WORKER THREADS + Promise.all in an API

app.get("/multi-fib", async (_req, res) => {
  const inputs = [35, 36, 37];  // heavy CPU tasks

  try {
    // Run all worker threads in parallel
    const results = await Promise.all(inputs.map(n => runFibWorker(n)));

    res.json({ results });
  } catch (err) {
    res.status(500).json({ error: "Failed to compute tasks" });
  }
});

*/