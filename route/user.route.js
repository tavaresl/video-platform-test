import UserController from '../controller/user.controller';

const userRoutes = (app) => {
  const userController = new UserController(app);

  app.post('/user', userController.create.bind(userController));
  app.get('/user', userController.getAll.bind(userController));
  app.get('/user/:id', userController.get.bind(userController));
  app.put('/user/:id', userController.update.bind(userController));
  app.delete('/user/:id', userController.delete.bind(userController));
};

export default userRoutes;
