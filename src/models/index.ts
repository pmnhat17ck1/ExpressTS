import Sequelize from "sequelize";
import config from "@config";
import AccountModel from "@/models/account.model";
import RoleModel from "@/models/role.model";
import ImageModel from "@/models/image.model";
import CountryModel from "@/models/country.model";
import SocialApplicationModel from "@/models/social-application.model";
import TaskModel from "@/models/task.model";
import TokenModel from "@/models/token.model";

import SocialAccountModel from "@/models/social-account.model";
import ProfileModel from "@/models/profile.model";
import AccountRoleModel from "./account-role.model";
import AccountCountryModel from "./account-country.model";

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

const models = {
  Account: AccountModel(sequelize),
  Role: RoleModel(sequelize),
  SocialApplication: SocialApplicationModel(sequelize),
  Task: TaskModel(sequelize),
  Country: CountryModel(sequelize),
  Image: ImageModel(sequelize),
  Profile: ProfileModel(sequelize),
  Token: TokenModel(sequelize),
  // table many to many
  SocialAccount: SocialAccountModel(sequelize),
  AccountRole: AccountRoleModel(sequelize),
  AccountCountry: AccountCountryModel(sequelize),
};
const {
  Account,
  Role,
  SocialApplication,
  Task,
  Country,
  Image,
  Profile,
  Token,
  SocialAccount,
  AccountRole,
  AccountCountry,
} = models;

const associations = () => {
  // Account

  Account.hasOne(Profile, {
    foreignKey: "account_id",
    onDelete: "CASCADE",
  });

  Account.hasMany(Image, {
    foreignKey: "account_id",
    onDelete: "CASCADE",
  });
  Account.hasMany(Task, {
    foreignKey: "account_id",
    onDelete: "CASCADE",
  });

  Account.hasOne(Token, {
    foreignKey: "account_id",
    onDelete: "CASCADE",
  });

  Account.belongsToMany(Country, {
    through: AccountCountry,
    foreignKey: "account_id",
  });

  Account.belongsToMany(Role, {
    through: AccountRole,
    foreignKey: "account_id",
  });

  Account.belongsToMany(SocialApplication, {
    through: SocialAccount,
    foreignKey: "account_id",
  });

  // ROLE
  Role.belongsToMany(Account, {
    through: AccountRole,
    foreignKey: "role_id",
  });

  // Social
  SocialApplication.belongsToMany(Account, {
    through: SocialAccount,
    foreignKey: "provider_id",
  });

  // Country
  Country.belongsToMany(Account, {
    through: AccountCountry,
    foreignKey: "country_id",
  });

  // Image
  Image.belongsTo(Account);

  // Profile
  Profile.belongsTo(Account);

  // Token
  Token.belongsTo(Account);
};

const DB = {
  ...models,
  associations,
  sequelize, // connection instance (RAW queries)
  Sequelize, // library
};

export default DB;
