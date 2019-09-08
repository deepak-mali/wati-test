import config from 'config';
import express from 'express';
import { routes } from './routes';
const port: any = config.get('port');
const app = express();
app.use(express.json());

routes(app);


app.listen(port, (err) => {
	if (err) {
		throw err;
	}
	return console.log(`server is listening to ${port}`);
});
