import config from 'config';
import express from 'express';

import { routes } from './routes';
import { logger } from './utils';

const port = config.get('port') as number;
const app: express.Application = express();

app.use(express.json());

routes(app);

app.listen(port, () => {
  logger.info(`server is listening to ${port}`);
});
