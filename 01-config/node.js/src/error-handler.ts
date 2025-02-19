import type { ErrorRequestHandler, RequestHandler } from 'express';


export const notFound: RequestHandler = (_req, res) => {
  res.status(404).send('404: Not Found');
};

export const handleError: ErrorRequestHandler = (err, _req, res, next) => {
  console.error('Global error handler:', err);
  res.status(500).send('500: Internal Server Error');
  next();
};
