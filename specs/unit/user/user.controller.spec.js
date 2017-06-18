import UserController from '../../../controller/user.controller';

describe('UserController unit tests', () => {
  const UserEntity = {
    create: td.function(),
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

  beforeEach(() => {
    userController = new UserController(UserEntity);
  });

  afterEach(() => {
    userController = null;
  });

  describe('#create()', () => {
    it('should create a new user', (done) => {
      const newUser = {
        firstName: 'New',
        lastName: 'User',
        email: 'newuser@mail.com',
        password: '12345',
      };

      td.when(UserEntity.create(newUser)).thenResolve(newUser);

      userController
        .create(newUser)
        .then((user) => {
          expect(user.firstName).to.be.eql(newUser.firstName);
          expect(user.lastName).to.be.eql(newUser.lastName);
          expect(user.email).to.be.eql(newUser.email);
          done();
        });
    });
  });

  describe('#getAll()', () => {
    it('should return a list of users', (done) => {
      td.when(UserEntity.findAll({})).thenResolve([defaultUser]);

      userController
        .getAll()
        .then((users) => {
          expect(users).to.be.eql([defaultUser]);
          done();
        });
    });
  });

  describe('#get(params)', () => {
    it('should return the user that has the given id', (done) => {
      td.when(UserEntity.findOne({ where: { id: 1 } })).thenResolve(defaultUser);

      userController
        .get({ id: 1 })
        .then((user) => {
          expect(user).to.be.eql(defaultUser);
          done();
        });
    });
  });

  describe('#update(user, params)', () => {
    it('should update the user that has the given id', (done) => {
      const requestBody = {
        firstName: 'Updated',
      };

      td.when(UserEntity.update(requestBody, { where: { id: 1 } }))
        .thenResolve([1]);

      userController
        .update(requestBody, { id: 1 })
        .then((updatedEntries) => {
          expect(updatedEntries).to.be.eql([1]);
          done();
        });
    });
  });

  describe('#delete(params)', () => {
    it('should delete the user that has the given id', (done) => {
      td.when(UserEntity.destroy({ where: { id: 1 } })).thenResolve([1]);

      userController
        .delete({ id: 1 })
        .then((deletedEntries) => {
          expect(deletedEntries).to.be.eql([1]);
          done();
        });
    });
  });
});
