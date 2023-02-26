"use strict";
const { hashSync } = require("bcrypt");
const uuidv4 = require("uuid").v4;

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    let idAdmin = uuidv4();
    await queryInterface.bulkInsert("accounts", [
      {
        id: idAdmin,
        username: "admin",
        password: hashSync("admin@adminsn", 10),
        phone: "77777777",
        email: "admin@admin.com",
        is_active: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
    await queryInterface.bulkInsert("account_country", [
      {
        country_id: "1",
        account_id: idAdmin,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("countries", null, {});
    await queryInterface.bulkDelete("account_country", null, {});
  },
};
