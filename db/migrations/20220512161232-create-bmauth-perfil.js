module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      "BMAUTH_PERFIL",
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
        ID_PERFIL: {
          allowNull: false,
          primaryKey: true,
          type: Sequelize.STRING(5),
        },
        DE_PERFIL: {
          allowNull: false,
          type: Sequelize.STRING(100),
        },
        ES_PERFIL: {
          allowNull: false,
          type: Sequelize.STRING(11),
        },
      },
      { logging: console.log }
    );
    await queryInterface.addConstraint("BMAUTH_PERFIL", {
      fields: ["ES_PERFIL"],
      type: "foreign key",
      name: "BMAUTH_PERFIL_FK_ES_PERFIL",
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
    await queryInterface.dropTable("BMAUTH_PERFIL", {
      logging: console.log,
    });
  },
};