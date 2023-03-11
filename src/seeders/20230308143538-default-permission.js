'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('permissions', [
      {
        name: 'read',
      },
      {
        name: 'write',
      },
      {
        name: 'create',
      },
      {
        name: 'update',
      },
      {
        name: 'delete',
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('permissions', null, {});
  },
};
