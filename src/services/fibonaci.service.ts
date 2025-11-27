import { CreateExampleDTO } from '../validators/example.dto';
import { prisma } from '../db/prisma';
import { ExampleModel } from '../models/example.model';
import { Worker } from "worker_threads";
import path from "path";

// Service is database-agnostic in signatures; implementation may choose Prisma (Postgres)
// or Mongoose (Mongo). Use one or the other depending on your deployment.

export async function runFibWorker(n: number): Promise<number> {
  return new Promise((resolve, reject) => {
    const worker = new Worker(
      path.resolve(__dirname, "workers/fib.worker.js")
    );

    worker.postMessage(n);

    worker.on("message", result => {
      resolve(result);
      worker.terminate();
    });

    worker.on("error", reject);
  });
}