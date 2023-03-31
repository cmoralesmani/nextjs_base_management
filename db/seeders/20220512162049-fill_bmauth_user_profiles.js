const jsData = require("../../db/data/BMAUTH_USER_PROFILES.json");

module.exports = {
  async up(queryInterface) {
    const records = JSON.parse(JSON.stringify(jsData));
    await queryInterface.bulkInsert("BMAUTH_USER_PROFILES", records, {});
  },
  async down(queryInterface) {
    await queryInterface.bulkDelete("BMAUTH_USER_PROFILES", null, {});
  },
};
