class UserController {
  constructor(User) {
    this.User = User;
  }

  create(user) {
    return this.User.create(user);
  }

  getAll() {
    return this.User.findAll({});
  }

  get(params) {
    return this.User.findOne({ where: params });
  }

  update(user, params) {
    return this.User.update(user, { where: params });
  }

  delete(params) {
    return this.User.destroy({ where: params });
  }
}

export default UserController;
