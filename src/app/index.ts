import config from 'config';
import express from 'express';

const port: any = config.get('port');
const app = express();

app.get('/', (req, res) => {
	res.send('Here we go lads!!');
});

app.listen(port, (err) => {
	if (err) {
		throw err;
	}
	return console.log(`server is listening to ${port}`);
});
