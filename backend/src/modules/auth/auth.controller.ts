import * as authService from './auth.serivce';
import { NextFunction, Request, Response } from 'express';

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;

    const result = await authService.login(email, password);
    res.json(result);
  } catch (e) {
    next(e);
  }
};

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password, username } = req.body;
    console.log('GOT', email, password);

    const result = await authService.register(email, password, username);
    return res.json(result);
  } catch (e) {
    next(e);
  }
};

export const refreshToken = async (req: Request, res: Response) => {
  try {
    const { token } = req.body; // refreshToken
    const result = await authService.refreshToken(token);
    return res.json(result);
  } catch (e) {
    res.status(500).json({
      status: 500,
      message: 'Something went wrong',
    });
  }
};
