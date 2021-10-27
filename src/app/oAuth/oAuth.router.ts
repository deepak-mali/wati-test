import { Request, Response, Router } from 'express';

import { logger } from '../../utils';
import * as validator from '../../validators';

import DiscoveryController from './oAuth.controller';
const router = Router();

router.post('/add', validator.add, (request: Request, response: Response) => {
  logger.info(`sending request payload for addition...`);
  const discoveryController = new DiscoveryController(request.body) as DiscoveryController;
  const sum = discoveryController.add(request.body);
  logger.info(`sending back the response...`);
  return response.status(200).json({
    sum,
  });
});

export const oAuthRouter = router;
