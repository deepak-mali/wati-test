import { Application } from 'express';

import { addRouter } from './app/add';

/**
 * @description - API endpoints declarations.
 * @param app - express server.
 */
export const routes = (app: Application): void => {
  // Route for addition functionality.
  app.use('/', addRouter);
};
