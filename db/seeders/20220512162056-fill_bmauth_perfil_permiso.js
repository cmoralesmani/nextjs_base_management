const jsData = require("../../db/data/BMAUTH_PERFIL_PERMISO.json");

module.exports = {
  async up(queryInterface) {
    const records = JSON.parse(JSON.stringify(jsData));
    await queryInterface.bulkInsert("BMAUTH_PERFIL_PERMISO", records, {});
  },
  async down(queryInterface) {
    await queryInterface.bulkDelete("BMAUTH_PERFIL_PERMISO", null, {});
  },
};