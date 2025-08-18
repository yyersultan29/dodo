import express from 'express';
import dotenv from 'dotenv';

import authRoutes from './modules/auth/auth.routes';
import { errorHandler } from './middlewares/error.handler';

dotenv.config();

const app = express();

app.use(express.json());

// routes
app.use('/auth', authRoutes);

app.use(errorHandler);

export default app;
