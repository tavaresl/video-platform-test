import HttpStatus from 'http-status';

// TODO: Testar unitariamente esse módulo

const controllerFactory = model => ({
  create: (req, res, next) => {
    model
      .create(req.body)
      .then((modelCreated) => {
        res.status(HttpStatus.OK).json(modelCreated);
      })
      .catch(next);
  },
  getAll: (req, res, next) => {
    model
      .findAll()
      .then((modelList) => {
        res.status(HttpStatus.OK).json(modelList);
      })
      .catch(next);
  },
  getBy: (req, res, next) => {
    model
      .findOne({ where: req.params })
      .then((modelFound) => {
        res.status(HttpStatus.OK).json(modelFound);
      })
      .catch(next);
  },
  update: (req, res, next) => {
    model
      .update(req.body, { where: req.params })
      .then(() => {
        res.status(HttpStatus.NO_CONTENT).send();
      })
      .catch(next);
  },
  remove: (req, res, next) => {
    model
      .destroy({ where: req.params })
      .then(() => {
        res.status(HttpStatus.NO_CONTENT).send();
      })
      .catch(next);
  },
});

export default controllerFactory;
