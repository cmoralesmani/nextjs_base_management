module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      "BMAUTH_DEFINICION_P",
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
        ID_DEFINICION_D: {
          allowNull: false,
          primaryKey: true,
          type: Sequelize.STRING(11),
        },
        FE_INICIO: {
          allowNull: false,
          primaryKey: true,
          type: Sequelize.DATEONLY,
        },
        FE_FIN: {
          allowNull: false,
          type: Sequelize.DATEONLY,
        },
        M_VALOR: {
          allowNull: false,
          type: Sequelize.STRING(30),
        },
        DE_VALOR: {
          allowNull: false,
          type: Sequelize.STRING(30),
        },
        IN_CAMBIO_EN_APLICACION: {
          allowNull: false,
          type: Sequelize.STRING(1),
        },
      },
      { logging: console.log }
    );
    await queryInterface.addConstraint("BMAUTH_DEFINICION_P", {
      fields: ["ID_DEFINICION_D"],
      type: "foreign key",
      name: "BMAUTH_DEFINICION_P_FK_ID_DEFINICION_D",
      references: {
        table: "BMAUTH_DEFINICION_D",
        field: "ID_DEFINICION_D",
      },
      onDelete: "no action",
      onUpdate: "cascade",
      logging: console.log,
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("BMAUTH_DEFINICION_P", {
      logging: console.log,
    });
  },
};