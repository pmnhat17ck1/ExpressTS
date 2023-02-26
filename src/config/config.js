module.exports = {
  development: {
    username: "postgres",
    password: "123456",
    database: "postgres",
    host: "127.0.0.1",
    port: 5432,
    dialect: "postgres",
    dialectOptions: {
      bigNumberStrings: true,
    },
  },
  production: {
    username: "postgres",
    password: "123456",
    database: "postgres",
    host: "127.0.0.1",
    dialect: "postgres",
    dialectOptions: {
      bigNumberStrings: true,
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
};
