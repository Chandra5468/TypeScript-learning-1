import express from 'express';
import 'express-async-errors';
import { json } from 'express';
import { exampleRouter } from './routes/example.routes';
import { errorHandler } from './middlewares/errorHandler';

const app = express();

app.use(json());

app.use('/api/v1/examples', exampleRouter);

app.use(errorHandler);

export { app };
