import mongoose from 'mongoose';
import app from '../app';
import { EMPTY_VALUE, PORT } from '../constants';

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
