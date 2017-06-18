import fs from 'fs';
import path from 'path';
import Sequelize from 'sequelize';

let database = null;

const loadEntities = (sequelize) => {
  const dir = path.join(__dirname, '../entity');
  const entities = [];

  fs.readdirSync(dir).forEach((file) => {
    const entityDir = path.join(dir, file);
    const entity = sequelize.import(entityDir);
    entities[entity.name] = entity;
  });

  return entities;
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
    entities: loadEntities(sequelize),
  };

  app.getEntity = entity => database.entities[entity];

  sequelize.sync().done(() => database);

  return database;
};

export default getDatabase;
