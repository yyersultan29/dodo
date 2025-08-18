import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { DEFAULT_PORT, EMPTY_VALUE } from './constants';
import { errorHandler } from './middlewares/error.handler';

dotenv.config();

const app = express();

app.use(express.json());

console.log('MONGO URL', process.env.MONGO_URI);

app.use(errorHandler);

export default app;
