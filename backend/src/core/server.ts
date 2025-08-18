import { connectDB } from './database';
import app from '../app';
import { PORT } from '../constants';

const start = async () => {
  console.log('BEFORE START');

  await connectDB();
  console.log('HERE START');

  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
};

start();
