import Sequelize from "sequelize";
import config from "@config";
import AccountModel from "@/models/account.model";
import RoleModel from "@/models/role.model";
import ImageModel from "@/models/image.model";
import CountryModel from "@/models/country.model";
import SocialApplicationModel from "@/models/social-application.model";
import TaskModel from "@/models/task.model";
import TokenModel from "@/models/token.model";
import NotificationModel from "@/models/notification.model";
import PaymentMethodModel from "@/models/payment-method.model";
import TransactionModel from "@/models/transaction.model";
import WalletModel from "@/models/wallet.model";
import ProductModel from "@/models/product.model";
import CardModel from "@/models/card.model";
import LikeModel from "@/models/like.model";
import RateModel from "@/models/rate.model";
import CommentModel from "@/models/comment.model";
import AddressModel from "@/models/address.model";
import CategoryModel from "@/models/category.model";
import OrderModel from "@/models/order.model";
import OrderDetailModel from "@/models/order-detail.model";

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
  Notification: NotificationModel(sequelize),
  PaymentMethod: PaymentMethodModel(sequelize),
  Transaction: TransactionModel(sequelize),
  Wallet: WalletModel(sequelize),
  Product: ProductModel(sequelize),
  Card: CardModel(sequelize),
  Like: LikeModel(sequelize),
  Rate: RateModel(sequelize),
  Comment: CommentModel(sequelize),
  Address: AddressModel(sequelize),
  Category: CategoryModel(sequelize),
  Order: OrderModel(sequelize),

  // table many to many
  OrderDetail: OrderDetailModel(sequelize),
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
  Notification,
  PaymentMethod,
  Transaction,
  Wallet,
  Product,
  Like,
  Rate,
  Address,
  Comment,
  Card,
  Order,
  Category,
  OrderDetail,
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
  Account.hasOne(Wallet, {
    foreignKey: "account_id",
    onDelete: "CASCADE",
  });
  Account.hasOne(Token, {
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
  Account.hasMany(Notification, {
    foreignKey: "account_id",
    onDelete: "CASCADE",
  });
  Account.hasMany(Transaction, {
    foreignKey: "account_id",
    onDelete: "CASCADE",
  });
  Account.hasMany(Card, {
    foreignKey: "account_id",
    onDelete: "CASCADE",
  });
  Account.hasMany(Address, {
    foreignKey: "account_id",
    onDelete: "CASCADE",
  });
  Account.hasMany(Order, {
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
  Image.belongsTo(Account, {
    foreignKey: "account_id",
    onDelete: "CASCADE",
  });
  // Profile
  Profile.belongsTo(Account, {
    foreignKey: "account_id",
    onDelete: "CASCADE",
  });
  // Token
  Token.belongsTo(Account, {
    foreignKey: "account_id",
    onDelete: "CASCADE",
  });
  // Wallet
  Wallet.belongsTo(Account, {
    foreignKey: "account_id",
    onDelete: "CASCADE",
  });
  // PaymentMethod
  PaymentMethod.hasMany(Transaction, {
    foreignKey: "payment_method_id",
    onDelete: "CASCADE",
  });
  PaymentMethod.hasMany(Card, {
    foreignKey: "payment_method_id",
    onDelete: "CASCADE",
  });
  // Transaction
  Transaction.belongsTo(Account, {
    foreignKey: "account_id",
    onDelete: "CASCADE",
  });
  Transaction.belongsTo(PaymentMethod, {
    foreignKey: "payment_method_id",
    onDelete: "CASCADE",
  });
  // Notification
  Notification.belongsTo(Account, {
    foreignKey: "account_id",
    onDelete: "CASCADE",
  });
  // Product
  Product.hasMany(Like, {
    foreignKey: "product_id",
    onDelete: "CASCADE",
  });
  Product.hasMany(Comment, {
    foreignKey: "product_id",
    onDelete: "CASCADE",
  });
  Product.hasMany(Rate, {
    foreignKey: "product_id",
    onDelete: "CASCADE",
  });
  Product.belongsToMany(Order, {
    through: OrderDetail,
    foreignKey: "product_id",
  });
  Product.belongsToMany(Category, { through: "product_categories" });
  // Card
  Card.belongsTo(Account, {
    foreignKey: "account_id",
    onDelete: "CASCADE",
  });
  Card.belongsTo(PaymentMethod, {
    foreignKey: "payment_method_id",
    onDelete: "CASCADE",
  });
  Card.belongsTo(Order, {
    foreignKey: "order_id",
    onDelete: "CASCADE",
  });
  // Like
  Like.belongsTo(Product, {
    foreignKey: "product_id",
    onDelete: "CASCADE",
  });
  // Comment
  Comment.belongsTo(Product, {
    foreignKey: "product_id",
    onDelete: "CASCADE",
  });
  // Rate
  Rate.belongsTo(Product, {
    foreignKey: "product_id",
    onDelete: "CASCADE",
  });
  // Address
  Address.belongsTo(Account, {
    foreignKey: "account_id",
    onDelete: "CASCADE",
  });
  // Order
  Order.hasOne(Card, {
    foreignKey: "order_id",
    onDelete: "CASCADE",
  });
  Order.hasMany(OrderDetail, {
    foreignKey: "order_id",
    onDelete: "CASCADE",
  });
  Order.belongsToMany(Product, {
    through: OrderDetail,
    foreignKey: "order_id",
  });
  Order.belongsTo(Account, {
    foreignKey: "account_id",
    onDelete: "CASCADE",
  });
  // OrderDetail
  OrderDetail.belongsTo(Order, {
    foreignKey: "order_id",
    onDelete: "CASCADE",
  });
  // Category
  Category.belongsToMany(Product, { through: "product_categories" });
};

const DB = {
  ...models,
  associations,
  sequelize, // connection instance (RAW queries)
  Sequelize, // library
};

export default DB;
