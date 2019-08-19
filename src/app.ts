import express from 'express';
import * as config from 'config';

const app = express();
const port = config.port || 3000;
app.get('/', (req, res) => {
  res.send('Here we go lads!!');
});

app.listen(port, (err) => {
  if(err) return console.error(err);
  return console.log(`server is listening to ${port}`);
});