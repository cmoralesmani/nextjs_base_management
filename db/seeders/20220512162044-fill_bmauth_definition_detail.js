const jsData = require("../../db/data/BMAUTH_DEFINITION_DETAIL.json");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const records = JSON.parse(JSON.stringify(jsData));
    await queryInterface.bulkInsert("BMAUTH_DEFINITION_DETAIL", records, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("BMAUTH_DEFINITION_DETAIL", null, {});
  },
};
