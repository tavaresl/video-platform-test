import express from 'express';
import bodyParser from 'body-parser';
import HttpStatus from 'http-status';

import config from './config/app.config';
import datasource from './config/datasource.config';
import authRoutes from './route/auth.route';
import userRoutes from './route/user.route';

const app = express();

app.use(bodyParser.json());

app.set('port', 7000);
app.set('config', config);
app.set('datasource', datasource(app));

authRoutes(app);
userRoutes(app);

app.get('/', (req, res) => {
  res.status(HttpStatus.OK);
  res.json('Hello World!');
});

export default app;
