import passport from 'passport';
import { Strategy, ExtractJwt } from 'passport-jwt';

const authConfig = (app) => {
  const User = app.getEntity('User');
  const opts = {
  };

  opts.secretOrKey = app.get('config').jwt.secret;
  opts.jwtFromRequest = ExtractJwt.fromAuthHeader();

  const strategy = new Strategy(opts, (payload, done) => {
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
  });

  passport.use(strategy);

  return {
    initialize: passport.initialize(),
    authenticate: passport.authenticate('jwt', app.get('config').jwt.session),
  };
};

export default authConfig;
