const jsData = require('../../db/data/BMAUTH_PERMISO_ACCION.json');

module.exports = {
  async up(queryInterface) {
    const records = JSON.parse(JSON.stringify(jsData));
    await queryInterface.bulkInsert('BMAUTH_PERMISO_ACCION', records, {});
  },
  async down(queryInterface) {
    await queryInterface.bulkDelete('BMAUTH_PERMISO_ACCION', null, {});
  },
};