import HttpStatus from 'http-status';

describe('User integration test', () => {
  const User = app.get('datasource').entities.User;

  const defaultUser = {
    id: 1,
    firstName: 'User',
    lastName: 'Test',
    email: 'user@mail.com',
    password: '12345',
  };

  beforeEach((done) => {
    User
      .destroy({ where: {} })
      .then(() => User.create(defaultUser))
      .then(() => done());
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
        .end((err, res) => {
          expect(res.status).to.be.eql(HttpStatus.NO_CONTENT);
          done(err);
        });
    });
  });
});
