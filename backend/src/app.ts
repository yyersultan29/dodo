import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { DEFAULT_PORT, EMPTY_VALUE } from './constants';

dotenv.config();

const app = express();

app.use(express.json());
const PORT = process.env.PORT || DEFAULT_PORT;

mongoose
  .connect(process.env.MONGO_URI || EMPTY_VALUE)
  .then(() => {
    console.log('MONGO DB Connected !');
    app.listen(PORT, () => {
      console.log(`Server running on ${PORT}`);
    });
  })
  .catch((e) => {
    console.error('Mongo error', e);
  });
