module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      "BMAUTH_DEFINICION_D",
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
        ID_DEFINICION_M: {
          allowNull: false,
          type: Sequelize.STRING(5),
        },
        DE_DEFINICION_D: {
          allowNull: false,
          type: Sequelize.STRING(255),
        },
        CM_DEFINICION_D: {
          allowNull: false,
          type: Sequelize.STRING(300),
        },
        TI_DEFINICION: {
          allowNull: false,
          type: Sequelize.STRING(10),
        },
      },
      { logging: console.log }
    );
    await queryInterface.addConstraint("BMAUTH_DEFINICION_D", {
      fields: ["ID_DEFINICION_M"],
      type: "foreign key",
      name: "BMAUTH_DEFINICION_D_FK_ID_DEFINICION_M",
      references: {
        table: "BMAUTH_DEFINICION_M",
        field: "ID_DEFINICION_M",
      },
      onDelete: "no action",
      onUpdate: "cascade",
      logging: console.log,
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("BMAUTH_DEFINICION_D", {
      logging: console.log,
    });
  },
};