import { Request, Response, NextFunction } from 'express';
import logger from '../libs/logger';

export function errorHandler(err: any, req: Request, res: Response) {
  logger.error(err.message);
  res.status(500).json({
    status: 'error',
    name: err.message,
    message: err.message
  });
}

export function customErrorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  logger.error(err.message);
  if (err.toJson && typeof err.toJson === 'function') {
    res.status(err.status).json(err.toJson());
  } else {
    res.status(500).json({
      status: 'error',
      name: err.message,
      message: err.message,
      path: err.path,
    });
  }
  next();
}
