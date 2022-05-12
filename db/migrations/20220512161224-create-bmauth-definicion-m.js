module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      "BMAUTH_DEFINICION_M",
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
        ID_DEFINICION_M: {
          allowNull: false,
          primaryKey: true,
          type: Sequelize.STRING(5),
        },
        DE_DEFINICION_M: {
          allowNull: false,
          type: Sequelize.STRING(100),
        },
        CM_DEFINICION: {
          allowNull: false,
          type: Sequelize.STRING(300),
        },
        ID_CAMPO: {
          allowNull: false,
          type: Sequelize.STRING(100),
        },
      },
      { logging: console.log }
    );
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("BMAUTH_DEFINICION_M", {
      logging: console.log,
    });
  },
};