import HttpStatus from 'http-status';
import jwt from 'jwt-simple';

import UserController from '../controller/user.controller';

const userRoutes = (app) => {
  const userController = new UserController(app.getModel('User'));

  app.route('/user/authenticate')
    .post((req, res) => {
      const email = req.body.email;
      const password = req.body.password;

      userController
        .get({ email })
        .then((user) => {
          const User = app.getModel('User');
          if (User.hasSamePassword(user.password, password)) {
            const token = jwt.encode(user, app.get('config').jwt.secret);

            res.status(HttpStatus.OK);
            res.json({ token });
          } else {
            res.sendStatus(HttpStatus.UNAUTHORIZED);
          }
        })
        .catch(() => res.sendStatus(HttpStatus.UNAUTHORIZED));
    });

  app.route('/user')
    .all(app.get('auth').authenticate())
    .post((req, res) => {
      userController
        .create(req.body)
        .then((user) => {
          res.status(HttpStatus.CREATED);
          res.json(user);
        })
        .catch(() => res.sendStatus(HttpStatus.UNPROCESSABLE_model));
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
    .all(app.get('auth').authenticate())
    .get((req, res) => {
      userController
        .get(req.params)
        .then((user) => {
          res.status(HttpStatus.OK);
          res.json(user);
        })
        .catch(() => res.sendStatus(HttpStatus.UNPROCESSABLE_model));
    })
    .put((req, res) => {
      userController
        .update(req.body, req.params)
        .then((rows) => {
          res.status(HttpStatus.OK);
          res.json(rows);
        })
        .catch(() => res.sendStatus(HttpStatus.UNPROCESSABLE_model));
    })
    .delete((req, res) => {
      userController
        .delete(req.params)
        .then(() => res.sendStatus(HttpStatus.NO_CONTENT))
        .catch(() => res.sendStatus(HttpStatus.UNPROCESSABLE_model));
    });
};

export default userRoutes;
