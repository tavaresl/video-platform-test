import jwt from 'jwt-simple';

import UserController from '../../../controller/user.controller';

describe('UserController unit tests', () => {
  const User = app.getEntity('User');
  const FakeUser = {
    create: td.function(),
    findById: td.function(),
    findOne: td.function(),
    findAll: td.function(),
    update: td.function(),
    destroy: td.function(),
  };
  const defaultUser = {
    id: 1,
    firstName: 'Default',
    lastName: 'User',
    email: 'defaultuser@mail.com',
    password: '12345',
    created_at: '2016-08-06T23:55:36.6922',
    updated_at: '2016-08-06T23:55:36.6922',
  };

  let userController = null;

  before((done) => {
    User
      .destroy({ where: {} })
      .then(() => {
        User
          .create(defaultUser)
          .then(() => done());
      });
  });

  beforeEach(() => {
    userController = new UserController(FakeUser);
  });

  afterEach(() => {
    userController = null;
  });

  after((done) => {
    app.getEntity('User')
      .destroy({ where: {} })
      .then(() => done());
  });

  describe('Default CRUD', () => {
    it('#create() should create a new user', (done) => {
      const newUser = {
        firstName: 'New',
        lastName: 'User',
        email: 'newuser@mail.com',
        password: '12345',
      };

      td.when(FakeUser.create(newUser)).thenResolve(newUser);

      userController
        .create(newUser)
        .then((user) => {
          expect(user.firstName).to.be.eql(newUser.firstName);
          expect(user.lastName).to.be.eql(newUser.lastName);
          expect(user.email).to.be.eql(newUser.email);
          done();
        });
    });

    it('#getAll() should return a list of users', (done) => {
      td.when(FakeUser.findAll({})).thenResolve([defaultUser]);

      userController
        .getAll()
        .then((users) => {
          expect(users).to.be.eql([defaultUser]);
          done();
        });
    });

    it('#get() should return the user that has the given id', (done) => {
      td.when(FakeUser.findOne({ where: { id: 1 } })).thenResolve(defaultUser);

      userController
        .get({ id: 1 })
        .then((user) => {
          expect(user).to.be.eql(defaultUser);
          done();
        });
    });

    it('#update() should update the user that has the given id', (done) => {
      const requestBody = {
        firstName: 'Updated',
      };

      td.when(FakeUser.update(requestBody, { where: { id: 1 } }))
        .thenResolve([1]);

      userController
        .update(requestBody, { id: 1 })
        .then((updatedEntries) => {
          expect(updatedEntries).to.be.eql([1]);
          done();
        });
    });

    it('#delete() should delete the user that has the given id', (done) => {
      td.when(FakeUser.destroy({ where: { id: 1 } })).thenResolve([1]);

      userController
        .delete({ id: 1 })
        .then((deletedEntries) => {
          expect(deletedEntries).to.be.eql([1]);
          done();
        });
    });
  });
});
