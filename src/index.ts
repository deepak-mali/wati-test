import config from 'config';
import express from 'express';
import { routes } from './routes';
import { logger } from './utils';

const port: any = config.get('port');
const app = express();
app.use(express.json());

routes(app);

app.listen(port, (err) => {
	if (err) {
		throw err;
	}
	logger.info(`server is listening to ${port}`);
});
