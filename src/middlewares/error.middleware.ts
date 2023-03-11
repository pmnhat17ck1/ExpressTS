import { ErrorRequestHandler, Request, Response, NextFunction } from 'express';
import { logger } from '@utils/logger';
import { response } from '../utils/response.util';

const errorHandler: ErrorRequestHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const status: number = error.status || 500;
    const message: string = error.message || 'Something went wrong';

    logger.error(
      `[${req.method}] ${req.path} >> StatusCode:: ${status}, Message:: ${message}`
    );
    response(res, status, message);
  } catch (error) {
    next(error);
  }
};
export default errorHandler;
