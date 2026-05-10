import { Request, Response, NextFunction } from 'express';
import { z, ZodTypeAny } from 'zod';

export const validateBody = (schema: ZodTypeAny) => (req: Request, res: Response, next: NextFunction) => {
  try {
    req.body = schema.parse(req.body);
    next();
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ errors: error.flatten() });
    }
    next(error);
  }
};
