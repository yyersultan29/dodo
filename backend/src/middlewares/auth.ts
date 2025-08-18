import { NextFunction, Request, Response } from 'express';
import { verifyAccessToken } from '../modules/auth/auth.serivce';

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: 'No token provided' });
  }
  // Bearer token
  const token = authHeader.split(' ')[1];
  console.log('REFRESHH TOKEN GOT', token);

  const decoded = verifyAccessToken(token);

  console.log('AUTH MIDDLEWARE DECODE', decoded);

  if (!decoded) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }

  (req as any).user = decoded;
  next();
};
