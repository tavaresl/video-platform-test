import HttpStatus from 'http-status';

describe('User integration test', () => {
  const expectedCreatedUser = {
    id: 1,
    firstName: 'User',
    lastName: 'Test',
    email: 'user@mail.com',
  };

  const expectedUpdatedUser = {
    id: 1,
    firstName: 'Updated user',
    lastName: 'Test',
    email: 'updated@mail.com',
  };

  describe('Route /user', () => {
    const userToCreate = {
      firstName: 'User',
      lastName: 'Test',
      email: 'user@mail.com',
      password: 'userpassword',
    };

    it('should create a valid user', (done) => {
      request
        .post('/user')
        .send(userToCreate)
        .end((err, res) => {
          expect(res.status).to.be.eql(HttpStatus.CREATED);
          expect(res.body.id).to.be.eql(expectedCreatedUser.id);
          expect(res.body.firstName).to.be.eql(expectedCreatedUser.firstName);
          expect(res.body.lastName).to.be.eql(expectedCreatedUser.lastName);
          expect(res.body.email).to.be.eql(expectedCreatedUser.email);
          done(err);
        });
    });

    it('should the list of registered users');
  });

  describe('Route /user/{id}', () => {
    it('should return the user with the given id');
    it('should update the user with the given id');
    it('should delete the user with the given id');
  });
});
