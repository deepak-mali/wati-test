import { Request, Response, Router } from 'express';

import { logger } from '../../utils';
import * as validator from '../../validators';

import AddController from './add.controller';
const router = Router();

router.post('/add', validator.add, async (request: Request, response: Response) => {
  logger.info(`sending request payload for addition...`);
  const addController = new AddController() as AddController;
  const sum = await addController.add(request.body);
  logger.info(`sending back the response...`);
  return response.status(200).json({
    sum,
  });
});

export const addRouter = router;
