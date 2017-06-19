import fs from 'fs';
import path from 'path';
import Sequelize from 'sequelize';

let database = null;

const loadmodels = (sequelize) => {
  const dir = path.join(__dirname, '../model');
  const models = [];

  fs.readdirSync(dir).forEach((file) => {
    const modelDir = path.join(dir, file);
    const model = sequelize.import(modelDir);
    models[model.name] = model;
  });

  return models;
};

const getDatabase = (app) => {
  if (database) {
    return database;
  }

  const config = app.get('config');
  const sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config.params,
  );

  database = {
    sequelize,
    Sequelize,
    models: loadmodels(sequelize),
  };

  sequelize.sync().done(() => database);

  return database;
};

export default getDatabase;
