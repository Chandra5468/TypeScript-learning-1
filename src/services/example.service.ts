import { CreateExampleDTO } from '../validators/example.dto';
import { prisma } from '../db/prisma';
import { ExampleModel } from '../models/example.model';

// Service is database-agnostic in signatures; implementation may choose Prisma (Postgres)
// or Mongoose (Mongo). Use one or the other depending on your deployment.

export async function createExamplePrisma(payload: CreateExampleDTO) {
  return prisma.example.create({ data: payload });
}

export async function createExampleMongo(payload: CreateExampleDTO) {
  const doc = new ExampleModel(payload);
  return doc.save();
}

export async function getExamplesPrisma(page = 1, limit = 10) {
  const skip = (page - 1) * limit;
  const [items, total] = await Promise.all([
    prisma.example.findMany({ skip, take: limit, orderBy: { id: 'desc' } }),
    prisma.example.count()
  ]);
  return { items, total };
}

export async function getExamplesMongo(page = 1, limit = 10) {
  const skip = (page - 1) * limit;
  const [items, total] = await Promise.all([
    ExampleModel.find().sort({ _id: -1 }).skip(skip).limit(limit).lean(),
    ExampleModel.countDocuments()
  ]);
  return { items, total };
}
