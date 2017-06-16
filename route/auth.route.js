import AuthController from '../controller/auth.controller';

const authRoutes = (app) => {
  const authController = new AuthController(app);

  app.route('/auth', () => {
    app.post('/', authController.authenticate);
  });
};

export default authRoutes;
