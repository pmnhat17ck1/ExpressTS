import fs from 'fs';
import path from 'path';

import { PostgresService } from '@/services/systems/postgres.service';
import { logger } from '@utils/logger';
const models: any = {};
const postgres = PostgresService.getInstance();
const { sequelize, Sequelize } = postgres;
const basename = path.basename(__filename);
try {
  fs.readdirSync(__dirname)
    .filter((file) => {
      return (
        file.indexOf('.') !== 0 &&
        file !== basename &&
        (file.slice(-9) === '.model.js' || file.slice(-9) === '.model.ts')
      );
    })
    .forEach((file) => {
      const model = require(path.join(__dirname, file))(sequelize);
      models[model.name] = model;
    });
} catch (error) {
  logger.error(error);
}

const associations = () => {
  Object.keys(models).forEach((modelName) => {
    if (models[modelName].associate) {
      models[modelName].associate(models);
      models[modelName].hook(models) || null;
    }
  });
};

const sync = (params) => {
  sequelize.sync(params);
};

const DB = {
  ...models,
  associations,
  sync,
  sequelize, // connection instance (RAW queries)
  Sequelize, // library
};

export default DB;
