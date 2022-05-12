const jsData = require("../../db/data/BMAUTH_DEFINICION_M.json");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const records = JSON.parse(JSON.stringify(jsData));
    await queryInterface.bulkInsert("BMAUTH_DEFINICION_M", records, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("BMAUTH_DEFINICION_M", null, {});
  },
};