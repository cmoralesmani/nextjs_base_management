const jsData = require('../../db/data/BMAUTH_USUARIO_PERFIL.json');

module.exports = {
  async up(queryInterface) {
    const records = JSON.parse(JSON.stringify(jsData));
    await queryInterface.bulkInsert('BMAUTH_USUARIO_PERFIL', records, {});
  },
  async down(queryInterface) {
    await queryInterface.bulkDelete('BMAUTH_USUARIO_PERFIL', null, {});
  },
};