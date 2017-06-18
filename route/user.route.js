import HttpStatus from 'http-status';

import UserController from '../controller/user.controller';

const userRoutes = (app) => {
  const userController = new UserController(app.getEntity('User'));

  app.route('/user')
    .post((req, res) => {
      userController
        .create(req.body)
        .then((user) => {
          res.status(HttpStatus.CREATED);
          res.json(user);
        })
        .catch(() => res.sendStatus(HttpStatus.UNPROCESSABLE_ENTITY));
    })
    .get((req, res) => {
      userController
        .getAll()
        .then((users) => {
          res.status(HttpStatus.OK);
          res.json(users);
        })
        .catch(() => res.sendStatus(HttpStatus.NOT_FOUND));
    });

  app.route('/user/:id')
    .get((req, res) => {
      userController
        .get(req.params)
        .then((user) => {
          res.status(HttpStatus.OK);
          res.json(user);
        })
        .catch(() => res.sendStatus(HttpStatus.UNPROCESSABLE_ENTITY));
    })
    .put((req, res) => {
      userController
        .update(req.body, req.params)
        .then((rows) => {
          res.status(HttpStatus.OK);
          res.json(rows);
        })
        .catch(() => res.sendStatus(HttpStatus.UNPROCESSABLE_ENTITY));
    })
    .delete((req, res) => {
      userController
        .delete(req.params)
        .then(() => res.sendStatus(HttpStatus.NO_CONTENT))
        .catch(() => res.sendStatus(HttpStatus.UNPROCESSABLE_ENTITY));
    });
};

export default userRoutes;
