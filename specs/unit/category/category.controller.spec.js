import CategoryController from '../../../controller/category.controller';

describe('Category controller unit tests', () => {
  const FakeCategory = {
    create: td.function(),
    findOne: td.function(),
    findAll: td.function(),
    update: td.function(),
    destroy: td.function(),
  };
  const defaultCategory = {
    id: 1,
    name: 'Default Category',
    active: true,
  };

  let categoryController = null;

  beforeEach(() => {
    categoryController = new CategoryController(FakeCategory);
  });

  afterEach(() => {
    categoryController = null;
  });

  describe('Default CRUD', () => {
    it('#create() should create a new category', (done) => {
      td.when(FakeCategory.create(defaultCategory)).thenResolve(defaultCategory);

      categoryController
        .create(defaultCategory)
        .then((category) => {
          expect(category.id).to.be.eql(defaultCategory.id);
          expect(category.name).to.be.eql(defaultCategory.name);
          expect(category.active).to.be.eql(defaultCategory.active);
          done();
        });
    });

    it('#getAll() should return a list of categories', (done) => {
      td.when(FakeCategory.findAll()).thenResolve([defaultCategory]);

      categoryController
        .getAll()
        .then((categories) => {
          expect(categories[0].id).to.be.eql(defaultCategory.id);
          expect(categories[0].name).to.be.eql(defaultCategory.name);
          expect(categories[0].active).to.be.eql(defaultCategory.active);
          done();
        });
    });

    it('#getBy() should return a category', (done) => {
      td.when(FakeCategory.findOne({ where: { id: 1 } })).thenResolve(defaultCategory);

      categoryController
        .getBy({ id: 1 })
        .then((category) => {
          expect(category.id).to.be.eql(defaultCategory.id);
          expect(category.name).to.be.eql(defaultCategory.name);
          expect(category.active).to.be.eql(defaultCategory.active);
          done();
        });
    });

    it('#update() should update a category', (done) => {
      const payload = {
        name: 'Updated Category',
        active: false,
      };

      td.when(FakeCategory.update(payload, { where: { id: 1 } })).thenResolve([1]);

      categoryController
        .update(payload, { id: 1 })
        .then((rows) => {
          expect(rows).to.be.eql([1]);
          done();
        });
    });
    it('#delete() should delete a category', (done) => {
      td.when(FakeCategory.destroy({ where: { id: 1 } })).thenResolve(1);

      categoryController
        .delete({ id: 1 })
        .then((rows) => {
          expect(rows).to.be.eql(1);
          done();
        });
    });
  });
});
