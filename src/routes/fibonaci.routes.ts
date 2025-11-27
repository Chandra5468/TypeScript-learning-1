import { Router } from 'express';
import { createExample, listExamples } from '../controllers/example.controller';

export const exampleRouter = Router();

exampleRouter.post('/', createExample);