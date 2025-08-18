import { Document, model, Schema } from 'mongoose';

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
}

export const userScheme = new Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Неверный формат email'],
    },
    password: {
      type: String,
      required: true,
      minlength: [8, 'Пароль должен содержать минимум 8 символов'],
    },
    username: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const User = model<IUser>('User', userScheme);
