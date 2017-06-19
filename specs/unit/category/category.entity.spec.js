describe('Category entity tests', () => {
  const Category = app.getEntity('Category');
  const defaultCategory = {
    id: 1,
    name: 'Category Default',
    active: true,
  };

  beforeEach((done) => {
    Category
      .destroy({ where: {} })
      .then(() => {
        Category
          .create(defaultCategory)
          .then(() => done())
          .catch(error => done(error));
      })
      .catch(error => done(error));
  });

  describe('Default CRUD', () => {
    it('#create() should create a new category', (done) => {
      const newCategory = { name: 'New Category' };
      Category
        .create(newCategory)
        .then((category) => {
          expect(category.name).to.be.eql(newCategory.name);
          expect(category.active).to.be.eql(true);
          done();
        });
    });

    it('#findAll() should return a list of categories', (done) => {
      Category
        .findAll()
        .then((categories) => {
          expect(categories[0].id).to.be.eql(defaultCategory.id);
          expect(categories[0].name).to.be.eql(defaultCategory.name);
          expect(categories[0].active).to.be.eql(defaultCategory.active);
          done();
        });
    });

    it('#findOne() should return a category', (done) => {
      Category
        .findOne({ where: { id: 1 } })
        .then((categories) => {
          expect(categories.id).to.be.eql(defaultCategory.id);
          expect(categories.name).to.be.eql(defaultCategory.name);
          expect(categories.active).to.be.eql(defaultCategory.active);
          done();
        });
    });

    it('#update() should update a category', (done) => {
      const payload = { name: 'Updated Category' };

      Category
        .update(payload, { where: { id: 1 } })
        .then((rows) => {
          expect(rows).to.be.eql([1]);
          done();
        });
    });

    it('#destroy() should delete a categoty', (done) => {
      Category
        .destroy({ where: { id: 1 } })
        .then((rows) => {
          expect(rows).to.be.eql(1);
          done();
        });
    });
  });
});
