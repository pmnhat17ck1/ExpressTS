'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('countries', [
      {
        name: 'Việt Nam',
        code: 'vi',
      },
      {
        name: 'English',
        code: 'en',
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('countries', null, {});
  },
};
