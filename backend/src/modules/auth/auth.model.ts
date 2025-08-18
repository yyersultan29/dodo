import { Document, model, Schema } from 'mongoose';

export interface IAuth extends Document {
  userId: Schema.Types.ObjectId;
  refreshToken: string;
}

const authScheme = new Schema<IAuth>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    refreshToken: {
      type: Schema.Types.String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Auth = model<IAuth>('Auth', authScheme);
