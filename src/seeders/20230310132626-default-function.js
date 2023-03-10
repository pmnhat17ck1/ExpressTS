"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("functions", [
      {
        name: "resetPassword",
      },
      {
        name: "clientDashboard",
      },
      {
        name: "adminDashboard",
      },
      {
        name: "loginQRCode",
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("functions", null, {});
  },
};
