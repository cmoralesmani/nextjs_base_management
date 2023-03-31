const jsData = require("../../db/data/BMAUTH_PROFILE_PERMISSIONS.json");

module.exports = {
  async up(queryInterface) {
    const records = JSON.parse(JSON.stringify(jsData));
    await queryInterface.bulkInsert("BMAUTH_PROFILE_PERMISSIONS", records, {});
  },
  async down(queryInterface) {
    await queryInterface.bulkDelete("BMAUTH_PROFILE_PERMISSIONS", null, {});
  },
};
