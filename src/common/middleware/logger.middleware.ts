import { NextFunction, Request, Response } from 'express';

export function logger(req: Request, res: Response, next: NextFunction) {
  console.log(`Request ${req.url} from IP ${req.ip}`);
  next();
}
