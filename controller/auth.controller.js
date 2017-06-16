class AuthController {
  constructor(app) {
    this.app = app;
  }

  authenticate(req, res) {
    console.log(req.body);
    console.log(this.app);
  }
}

export default AuthController;
