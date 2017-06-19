import HttpStatus from 'http-status';

describe('Category routes unit tests', () => {
  const User = app.getModel('User');
  const Category = app.getModel('Category');
  const defaultCategory = {
    id: 1,
    name: 'Default Category',
    active: true,
  };

  let token = null;

  before((done) => {
    const payload = {
      firstName: 'Default',
      lastName: 'User',
      email: 'user@mail.com',
      password: '12345',
    };

    User
      .destroy({ where: {} })
      .then(() => {
        User
          .create(payload)
          .then(() => {
            request
              .post('/user/authenticate')
              .send({ email: payload.email, password: payload.password })
              .end((err, res) => {
                token = res.body.token;
                done();
              });
          })
          .catch(error => done(error));
      });
  });

  beforeEach((done) => {
    Category
      .destroy({ where: {} })
      .then(() => {
        Category
          .create(defaultCategory)
          .then(() => done());
      });
  });

  describe('Route /category', () => {
    it('POST: should create a new category', (done) => {
      const payload = { name: 'New Category' };

      request
        .post('/category')
        .set('Authorization', `JWT ${token}`)
        .send(payload)
        .end((err, res) => {
          expect(res.status).to.be.eql(HttpStatus.OK);
          expect(res.body.name).to.be.eql(payload.name);
          expect(res.body.active).to.be.eql(true);
          done();
        });
    });
    it('GET: should return a list of categories');
  });

  describe('Route /category/{id}', () => {
    it('GET: should return  category');
    it('PUT: should update a category');
    it('DELETE: should delete a category');
  });
});
