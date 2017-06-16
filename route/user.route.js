import UserController from '../controller/user.controller';

const userRoutes = (app) => {
  const userController = new UserController(app);

  app.post('/user', userController.create.bind(userController));
};

export default userRoutes;
