import HttpStatus from 'http-status';

class UserController {
  constructor(app) {
    this.User = app.get('datasource').entities.User;
  }

  create(req, res) {
    const userToCreate = req.body;
    this.User.create(userToCreate)
      .then((user) => {
        res.status(HttpStatus.CREATED);
        res.json(user);
      })
      .catch(() => res.sendStatus(HttpStatus.INTERNAL_SERVER_ERROR));
  }
}

export default UserController;
