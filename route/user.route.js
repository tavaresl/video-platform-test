import UserController from '../controller/user.controller';

const userRoutes = (app) => {
  const userController = new UserController(app);

  app.post('/user', userController.create);
};

export default userRoutes;
