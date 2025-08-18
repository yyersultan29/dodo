import * as authService from './auth.serivce';
import { Request, Response } from 'express';

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const result = await authService.login(email, password);
    res.json(result);
  } catch (e) {
    res.status(401).json({
      status: 401,
      message: 'Error',
    });
  }
};
