import { Request, Response, NextFunction } from "express";
import { ErrorRequestHandler } from "express";
import dotenv from "dotenv";

require("dotenv").config();

export const errorHandler: ErrorRequestHandler = (err, req: Request, res: Response, next: NextFunction) => {
  const statusCode = res.statusCode ? res.statusCode : 500;
  res.status(statusCode);
  res.status(404).json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
  next();
};
