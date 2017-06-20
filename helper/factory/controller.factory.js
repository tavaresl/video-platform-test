import HttpStatus from 'http-status';

// TODO: Testar unitariamente esse módulo

const controllerFactory = model => ({
  create: (req, res, next) => {
    model
      .create(req.body)
      .then((modelCreated) => {
        res.status(HttpStatus.OK);
        res.json(modelCreated);
      })
      .catch(error => next(error));
  },
  getAll: (req, res, next) => {
    model
      .findAll()
      .then((modelList) => {
        res.status(HttpStatus.OK);
        res.json(modelList);
      })
      .catch(error => next(error));
  },
  getBy: (req, res, next) => {
    model
      .findOne({ where: req.params })
      .then((modelFound) => {
        res.status(HttpStatus.OK);
        res.json(modelFound);
      })
      .catch(error => next(error));
  },
  update: (req, res, next) => {
    model
      .update(req.body, { where: req.params })
      .then(() => {
        res.sendStatus(HttpStatus.OK);
      })
      .catch(error => next(error));
  },
  remove: (req, res, next) => {
    model
      .destroy({ where: req.params })
      .then(() => {
        res.sendStatus(HttpStatus.OK);
      })
      .catch(error => next(error));
  },
});

export default controllerFactory;
