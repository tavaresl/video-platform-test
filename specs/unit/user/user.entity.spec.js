describe('User model unit tests', () => {
  const User = app.getModel('User');
  const defaultUser = {
    id: 1,
    firstName: 'Default',
    lastName: 'User',
    email: 'defaultuser@mail.com',
    password: '12345',
    created_at: '2016-08-06T23:55:36.6922',
    updated_at: '2016-08-06T23:55:36.6922',
  };

  describe('Default CRUD', () => {
    it('#create() should create a user', (done) => {
      User
        .create(defaultUser)
        .then((user) => {
          expect(user.id).to.be.eql(defaultUser.id);
          expect(user.firstName).to.be.eql(defaultUser.firstName);
          expect(user.lastName).to.be.eql(defaultUser.lastName);
          expect(user.email).to.be.eql(defaultUser.email);
          done();
        });
    });

    it('#findAll() should return a list of user', (done) => {
      User
        .findAll({})
        .then((users) => {
          expect(users[0].id).to.be.eql(defaultUser.id);
          expect(users[0].firstName).to.be.eql(defaultUser.firstName);
          expect(users[0].lastName).to.be.eql(defaultUser.lastName);
          expect(users[0].email).to.be.eql(defaultUser.email);
          done();
        });
    });

    it('#findOne() should return a user', (done) => {
      User
        .findOne({ where: { id: 1 } })
        .then((user) => {
          expect(user.id).to.be.eql(defaultUser.id);
          expect(user.firstName).to.be.eql(defaultUser.firstName);
          expect(user.lastName).to.be.eql(defaultUser.lastName);
          expect(user.email).to.be.eql(defaultUser.email);
          done();
        });
    });

    it('#update() should update a user', (done) => {
      const requestBody = {
        firstName: 'Updated',
        mail: 'updateduser@mail.com',
      };
      User
        .update(requestBody, { where: { id: 1 } })
        .then((rows) => {
          expect(rows).to.be.eql([1]);
          done();
        });
    });
    it('#destroy() should delete a user', (done) => {
      User
        .destroy({ where: { id: 1 } })
        .then((rows) => {
          expect(rows).to.be.eql(1);
          done();
        });
    });
  });
});
