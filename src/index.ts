/* eslint-disable @typescript-eslint/no-floating-promises */
import config from 'config';
import express from 'express';
import mongoose from 'mongoose';

import { routes } from './routes';
import { logger } from './utils';

const port = config.get('port') as number;
const app: express.Application = express();

app.use(express.json());

routes(app);

// Dirty job: Initializing db here.
mongoose
  .connect('mongodb+srv://m001-student:shunya-pe-sawar@sandbox.fi0zudo.mongodb.net/?retryWrites=true&w=majority', {
    autoIndex: false, // Don't build indexes
    family: 4, // Use IPv4, skip trying IPv6
    maxPoolSize: 10, // Maintain up to 10 socket connections
    serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    logger.info('MongoDB connected!');
  });

app.listen(port, () => {
  logger.info(`server is listening to ${port}`);
});
