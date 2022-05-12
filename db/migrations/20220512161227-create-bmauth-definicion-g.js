module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      "BMAUTH_DEFINICION_G",
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
        ID_DEFINICION_X: {
          allowNull: false,
          primaryKey: true,
          type: Sequelize.STRING(30),
        },
        IN_DEFINICION_PROPIO: {
          allowNull: false,
          type: Sequelize.STRING(1),
        },
      },
      { logging: console.log }
    );

    await queryInterface.addConstraint("BMAUTH_DEFINICION_G", {
      fields: ["ID_DEFINICION_D"],
      type: "foreign key",
      name: "BMAUTH_DEFINICION_G_FK_ID_DEFINICION_D",
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
    await queryInterface.dropTable("BMAUTH_DEFINICION_G", {
      logging: console.log,
    });
  },
};