const jsData = require("../../db/data/BMAUTH_PERMISSION.json");

module.exports = {
  async up(queryInterface) {
    const records = JSON.parse(JSON.stringify(jsData));
    await queryInterface.bulkInsert("BMAUTH_PERMISSION", records, {});
  },
  async down(queryInterface) {
    await queryInterface.bulkDelete("BMAUTH_PERMISSION", null, {});
  },
};
