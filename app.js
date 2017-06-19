import express from 'express';
import bodyParser from 'body-parser';
import HttpStatus from 'http-status';

import config from './config/app.config';
import datasource from './config/datasource.config';
import authConfig from './config/auth.config';
import userRoutes from './route/user.route';
import categoryRoutes from './route/category.route';

const app = express();

app.set('port', 7000);
app.set('config', config);
app.set('datasource', datasource(app));
app.set('auth', authConfig(app));

app.use(bodyParser.json());
app.use(app.get('auth').initialize());

app.getModel = model => app.get('datasource').models[model];

userRoutes(app);
categoryRoutes(app);

app.get('/', (req, res) => {
  res.status(HttpStatus.OK);
  res.json('Hello World!');
});

export default app;
