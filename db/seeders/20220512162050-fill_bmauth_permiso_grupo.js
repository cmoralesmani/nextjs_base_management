const jsData = require("../../db/data/BMAUTH_PERMISO_GRUPO.json");

module.exports = {
  async up(queryInterface) {
    const records = JSON.parse(JSON.stringify(jsData));
    await queryInterface.bulkInsert("BMAUTH_PERMISO_GRUPO", records, {});
  },
  async down(queryInterface) {
    await queryInterface.bulkDelete("BMAUTH_PERMISO_GRUPO", null, {});
  },
};