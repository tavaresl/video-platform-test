import HttpStatus from 'http-status';

class UserController {
  constructor(app) {
    this.User = app.get('datasource').entities.User;
  }

  create(req, res) {
    const userToCreate = req.body;

    return this.User.create(userToCreate)
      .then((user) => {
        res.status(HttpStatus.CREATED);
        res.json(user);
      })
      .catch((error) => {
        console.log(error);
        res.sendStatus(HttpStatus.INTERNAL_SERVER_ERROR);
      });
  }
}

export default UserController;
