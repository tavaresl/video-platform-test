class CategoryController {
  constructor(Category) {
    this.Category = Category;
  }

  create(category) {
    return this.Category.create(category);
  }

  getAll() {
    return this.Category.findAll();
  }

  getBy(params) {
    return this.Category.findOne({ where: params });
  }

  update(payload, params) {
    return this.Category.update(payload, { where: params });
  }

  delete(params) {
    return this.Category.destroy({ where: params });
  }
}

export default CategoryController;
