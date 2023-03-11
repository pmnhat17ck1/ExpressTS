'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('functions', [
      {
        name: 'resetPassword',
      },
      {
        name: 'clientDashboard',
      },
      {
        name: 'adminDashboard',
      },
      {
        name: 'loginQRCode',
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('functions', null, {});
  },
};
