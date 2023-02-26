import { ErrorRequestHandler, NextFunction, Request, Response } from "express";

const errorHandler: ErrorRequestHandler = (
  err: any,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
) => {
  res.status(err.status ?? 500);
  res.send({
    success: false,
    status: err.status ?? 500,
    msg: err.message,
  });
};
export default errorHandler;
