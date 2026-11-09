import { ErrorRequestHandler } from 'express';

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.error(err);
  
  if (err.name === 'ValidationError' || err.name === 'CastError') {
    res.status(400).json({ success: false, message: 'Invalid data' });
    return;
  }

  res.status(500).json({ success: false, message: 'Something went wrong' });
};