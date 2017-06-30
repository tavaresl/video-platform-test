import HttpStatus from 'http-status';

class BaseController {
  constructor(model) {
    this.model = model;
  }

  create(req, res, next) {
    this.model
      .create(req.body)
      .then((modelCreated) => {
        res.status(HttpStatus.OK).json(modelCreated);
      })
      .catch(next);
  }

  getAll(req, res, next) {
    this.model
      .findAll()
      .then((modelList) => {
        res.status(HttpStatus.OK).json(modelList);
      })
      .catch(next);
  }

  getBy(req, res, next) {
    this.model
      .findOne({where: req.params})
      .then((modelFound) => {
        res.status(HttpStatus.OK).json(modelFound);
      })
      .catch(next);
  }

  update(req, res, next) {
    this.model
      .update(req.body, {where: req.params})
      .then(() => {
        res.status(HttpStatus.NO_CONTENT).send();
      })
      .catch(next);
  }

  remove(req, res, next) {
    this.model
      .destroy({where: req.params})
      .then(() => {
        res.status(HttpStatus.NO_CONTENT).send();
      })
      .catch(next);
  }
}

export default BaseController;
