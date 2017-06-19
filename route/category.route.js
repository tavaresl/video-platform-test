import HttpStatus from 'http-status';

import CategoryController from '../controller/category.controller';

const categoryRoutes = (app) => {
  const categoryController = new CategoryController(app.getEntity('Category'));

  app.route('/category')
    .all(app.get('auth').authenticate())
    .post((req, res) => {
      categoryController
        .create(req.body)
        .then((category) => {
          res.status(HttpStatus.OK);
          res.json(category);
        })
        .catch(() => res.sendStatus(HttpStatus.UNPROCESSABLE_ENTITY));
    });
};

export default categoryRoutes;
