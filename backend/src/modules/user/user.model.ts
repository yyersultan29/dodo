import bcrypt from 'bcryptjs';
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

userScheme.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

export const User = model<IUser>('User', userScheme);
