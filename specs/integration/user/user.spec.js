import HttpStatus from 'http-status';
import jwt from 'jwt-simple';

describe('User integration test', () => {
  const User = app.get('datasource').models.User;

  const defaultUser = {
    id: 1,
    firstName: 'User',
    lastName: 'Test',
    email: 'user@mail.com',
    password: '12345',
  };

  let token = null;

  beforeEach((done) => {
    User
      .destroy({ where: {} })
      .then(() => {
        User.create(defaultUser)
          .then((user) => {
            token = jwt.encode(user, app.get('config').jwt.secret);
            done();
          });
      });
  });

  describe('Route /user', () => {
    const newUser = {
      firstName: 'User',
      lastName: 'Test',
      email: 'user@mail.com',
      password: 'userpassword',
    };

    it('should create a valid user', (done) => {
      request
        .post('/user')
        .set('Authorization', `JWT ${token}`)
        .send(newUser)
        .end((err, res) => {
          expect(res.status).to.be.eql(HttpStatus.CREATED);
          expect(res.body.firstName).to.be.eql(newUser.firstName);
          expect(res.body.lastName).to.be.eql(newUser.lastName);
          expect(res.body.email).to.be.eql(newUser.email);
          done(err);
        });
    });

    it('should the list of registered users', (done) => {
      request
        .get('/user')
        .set('Authorization', `JWT ${token}`)
        .end((err, res) => {
          expect(res.status).to.be.eql(HttpStatus.OK);
          expect(res.body[0].firstName).to.be.eql(defaultUser.firstName);
          expect(res.body[0].lastName).to.be.eql(defaultUser.lastName);
          expect(res.body[0].email).to.be.eql(defaultUser.email);
          done(err);
        });
    });
  });

  describe('Route /user/{id}', () => {
    it('should return the user with the given id', (done) => {
      request
        .get('/user/1')
        .set('Authorization', `JWT ${token}`)
        .end((err, res) => {
          expect(res.status).to.be.eql(HttpStatus.OK);
          expect(res.body.firstName).to.be.eql(defaultUser.firstName);
          expect(res.body.lastName).to.be.eql(defaultUser.lastName);
          expect(res.body.email).to.be.eql(defaultUser.email);
          done(err);
        });
    });

    it('should update the user with the given id', (done) => {
      const update = {
        firstName: 'User',
        lastName: 'Updated',
        email: 'updateduser@mail.com',
      };

      request
        .put('/user/1')
        .set('Authorization', `JWT ${token}`)
        .send(update)
        .end((err, res) => {
          expect(res.status).to.be.eql(HttpStatus.OK);
          expect(res.body).to.be.eql([1]);
          done(err);
        });
    });

    it('should delete the user with the given id', (done) => {
      request
        .delete('/user/1')
        .set('Authorization', `JWT ${token}`)
        .end((err, res) => {
          expect(res.status).to.be.eql(HttpStatus.NO_CONTENT);
          done(err);
        });
    });
  });

  describe('Route /user/authenticate', () => {
    it('should authenticate a valid user', (done) => {
      const payload = {
        email: defaultUser.email,
        password: defaultUser.password,
      };

      request
        .post('/user/authenticate')
        .send(payload)
        .end((err, res) => {
          expect(res.status).to.be.eql(HttpStatus.OK);
          done();
        });
    });

    it('should not authenticate an invalid user', (done) => {
      const payload = {
        email: 'invaliduser@mail.com',
        password: 'invalidpassword',
      };

      request
        .post('/user/authenticate')
        .send(payload)
        .end((err, res) => {
          expect(res.status).to.be.eql(HttpStatus.UNAUTHORIZED);
          done();
        });
    });
  });
});
