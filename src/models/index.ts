import Sequelize from "sequelize";
import fs from "fs";
import path from "path";

import config from "@config";
import { logger } from "@utils/logger";

const sequelize = new Sequelize.Sequelize(
  config.DB_POSTGRES_DATABASE,
  config.DB_POSTGRES_USERNAME,
  config.DB_POSTGRES_PASSWORD,
  {
    dialect: "postgres",
    host: config.DB_POSTGRES_HOST,
    port: Number(config.DB_POSTGRES_PORT),
    timezone: "+07:00",
    define: {
      charset: "utf8mb4",
      collate: "utf8mb4_general_ci",
      underscored: true,
      freezeTableName: true,
    },
    pool: {
      min: 0,
      max: 5,
    },
    logQueryParameters: config.NODE_ENV === "development",
    logging: (query, time) => {
      logger.info(time + "ms" + " " + query);
    },
    benchmark: true,
  }
);

const models: any = {};

const basename = path.basename(__filename);
try {
  fs.readdirSync(__dirname)
    .filter((file) => {
      return (
        file.indexOf(".") !== 0 &&
        file !== basename &&
        (file.slice(-9) === ".model.js" || file.slice(-9) === ".model.ts")
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

const DB = {
  ...models,
  associations,
  sequelize, // connection instance (RAW queries)
  Sequelize, // library
};

export default DB;
