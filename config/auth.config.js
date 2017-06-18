import passport from 'passport';
import { Strategy, ExtractJwt as Extract } from 'passport-jwt';

const authConfig = (app) => {
  const User = app.get('datasource').entities.User;
  const options = {
    secretOrKey: app.get('config').jwt.secret,
    jwtFromRequest: Extract.fromAuthHeader(),
  };

  const verify = (payload, done) => {
    User
      .findById(payload.id)
      .then((user) => {
        if (!user) {
          return done(null, false);
        }

        return done(null, {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
        });
      })
      .catch(error => done(error, null));
  };

  const strategy = new Strategy(options, verify);

  passport.use(strategy);

  return {
    initialize: () => passport.initialize(),
    authenticate: () => passport.authenticate('jwt', app.get('config').jwt.session),
  };
};

export default authConfig;
