module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      "BMAUTH_PERMISO_ACCION",
      {
        F_CREACION: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        USR_CREACION: {
          allowNull: false,
          type: Sequelize.STRING(30),
        },
        PROG_CREACION: {
          allowNull: false,
          type: Sequelize.STRING(15),
        },
        F_ACTUAL: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        USR_ACTUAL: {
          allowNull: false,
          type: Sequelize.STRING(30),
        },
        PROG_ACTUAL: {
          allowNull: false,
          type: Sequelize.STRING(15),
        },
        ID_PERMISO_ACCION: {
          allowNull: false,
          primaryKey: true,
          type: Sequelize.STRING(5),
        },
        DE_PERMISO_ACCION: {
          allowNull: false,
          type: Sequelize.STRING(100),
        },
      },
      { logging: console.log }
    );
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("BMAUTH_PERMISO_ACCION", {
      logging: console.log,
    });
  },
};