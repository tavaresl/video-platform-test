import HttpStatus from 'http-status';

class UserController {
  constructor(app) {
    this.User = app.get('datasource').entities.User;
  }

  create(req, res) {
    return this.User
      .create(req.body)
      .then((user) => {
        res.status(HttpStatus.CREATED);
        res.json(user);
      })
      .catch(() => res.sendStatus(HttpStatus.UNPROCESSABLE_ENTITY));
  }

  getAll(req, res) {
    return this.User
      .findAll()
      .then((users) => {
        res.status(HttpStatus.OK);
        res.json(users);
      })
      .catch(() => res.sendStatus(HttpStatus.NOT_FOUND));
  }

  get(req, res) {
    return this.User
      .findOne(req.params)
      .then((user) => {
        res.status(HttpStatus.OK);
        res.json(user);
      })
      .catch(() => res.sendStatus(HttpStatus.UNPROCESSABLE_ENTITY));
  }

  update(req, res) {
    return this.User
      .update(req.body, { where: req.params })
      .then((rows) => {
        res.status(HttpStatus.OK);
        res.json(rows);
      })
      .catch(() => res.sendStatus(HttpStatus.UNPROCESSABLE_ENTITY));
  }

  delete(req, res) {
    return this.User
      .destroy({ where: req.params })
      .then(() => res.sendStatus(HttpStatus.NO_CONTENT))
      .catch(() => res.sendStatus(HttpStatus.UNPROCESSABLE_ENTITY));
  }
}

export default UserController;
