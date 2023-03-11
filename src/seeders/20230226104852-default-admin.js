'use strict';
const { hashSync } = require('bcrypt');
const uuidv4 = require('uuid').v4;

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    let idAdmin = uuidv4();
    await queryInterface.bulkInsert('accounts', [
      {
        id: idAdmin,
        username: 'admin',
        password: hashSync('admin@adminsn', 10),
        phone: '0386487072',
        email: 'admin123@gmail.com',
        is_active: true,
        country_id: '1',
        role_id: '1',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
    await queryInterface.bulkInsert('tokens', [
      {
        account_id: idAdmin,
      },
    ]);
    await queryInterface.bulkInsert('wallets', [
      {
        balance: 0,
        account_id: idAdmin,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('accounts', null, {});
    await queryInterface.bulkDelete('tokens', null, {});
  },
};
