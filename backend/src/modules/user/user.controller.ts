import { NextFunction, Request, Response } from 'express';
import * as userService from './user.service';

export const getUserById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const result = await userService.getUser(id);
    return res.json(result);
  } catch (e) {
    next(e);
  }
};
