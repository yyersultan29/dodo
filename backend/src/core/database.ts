import mongoose from 'mongoose';
import { EMPTY_VALUE, PORT } from '../constants';

console.log('START MONGO CONNECT');

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || EMPTY_VALUE);
    console.log('✅ MongoDB connected');
  } catch (e) {
    console.error('❌ Mongo connection error', e);
    process.exit(1);
  }
};
