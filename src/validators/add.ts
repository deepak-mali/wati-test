import { Request, Response, NextFunction } from 'express';
import * as Joi from 'joi';

import { logger } from '../utils';

const schema = Joi.object({
  body: {
    numbers: Joi.array().items(Joi.number().strict().required()),
  },
}).unknown(true);

export const add = (request: Request, response: Response, next: NextFunction): Response | NextFunction | undefined => {
  logger.info(`validating request for endpoint ${request.url}`);
  const result: Joi.ValidationResult = schema.validate(request);
  if (result.error) {
    logger.info(`validating failed for endpoint ${request.url} with error ${result.error as unknown as string}`);
    return response.status(400).json({
      code: 400,
      message: `Bad Request: ${result.error as unknown as string}`,
    });
  }
  logger.info(`validated request...`);
  next();
};
