module.exports = {
  development: {
    username: 'postgres',
    password: '123456',
    database: 'postgres',
    host: 'postgres',
    port: 5432,
    dialect: 'postgres',
    dialectOptions: {
      bigNumberStrings: true,
    },
  },
  production: {
    username: 'postgres',
    password: '123456',
    database: 'postgres',
    host: 'postgres',
    dialect: 'postgres',
    dialectOptions: {
      bigNumberStrings: true,
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
};
