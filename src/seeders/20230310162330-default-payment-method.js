'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('payment_method', [
      {
        name: 'Visa',
        code: 'visa',
      },
      {
        name: 'Master Card',
        code: 'master Card',
      },
      {
        name: 'Ví momo',
        code: 'momo',
      },
      {
        name: 'VNPAY',
        code: 'vnpay',
      },
      {
        name: 'default',
        code: 'default',
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('payment_method', null, {});
  },
};
