import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { IUser, User } from '../user/user.model';
import { Auth } from './auth.model';
import { BadRequestError, UnauthorizedError } from '../../errors';

const JWT_SECRET = process.env.JWT_SECRET || 'super_secret_key';
const JWT_EXPIRES_IN = '15m'; // 15 минут
const REFRESH_SECRET = process.env.REFRESH_SECRET || 'refresh_secret_key';
const REFRESH_EXPIRES_IN = '7d';

export const generateAccessToken = (user: IUser) => {
  return jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  });
};

export const generateRefreshToken = (user: IUser) => {
  return jwt.sign({ id: user._id }, REFRESH_SECRET, {
    expiresIn: REFRESH_EXPIRES_IN,
  });
};

export const login = async (email: string, password: string) => {
  try {
    if (!email || !password) {
      throw new BadRequestError('Email and password required');
    }
    const findUser = await User.findOne({ email });
    if (!findUser) {
      throw new UnauthorizedError('User not registered');
    }

    const isMatch = await bcrypt.compare(password, findUser.password);
    if (!isMatch) {
      throw new BadRequestError('Email or password incorrect');
    }
    const accessToken = generateAccessToken(findUser);
    const refreshToken = generateRefreshToken(findUser);

    // update or save new refresh token
    await Auth.findOneAndUpdate(
      { userId: findUser._id },
      { refreshToken },
      { upsert: true }
    );

    return { accessToken, refreshToken, user: findUser };
  } catch (e) {
    console.error('auth.service [login] error', e);
    throw e;
  }
};

export const register = async (
  email: string,
  password: string,
  username: string
) => {
  try {
    if (!email || !password) {
      throw new BadRequestError('Email and password required');
    }
    const findUser = await User.findOne({ email });
    if (findUser) {
      throw new BadRequestError('User already exists');
    }
    const newUser = new User({ email, password, username });
    await newUser.save();

    return { newUser, message: 'User created successfully' };
  } catch (err) {
    console.log(err);

    throw err;
  }
};

export const refreshToken = async (token: string) => {
  try {
    if (!token) {
      throw new BadRequestError('Token required');
    }
  } catch (e) {}
};
