module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      "BMAUTH_USUARIO",
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
        ID_USUARIO: {
          allowNull: false,
          primaryKey: true,
          type: Sequelize.UUID,
        },
        USERNAME: {
          allowNull: false,
          type: Sequelize.STRING(30),
        },
        PASSWORD: {
          allowNull: false,
          type: Sequelize.STRING,
        },
        NOM_USUARIO: {
          allowNull: false,
          type: Sequelize.STRING(80),
        },
        APE_USUARIO: {
          allowNull: false,
          type: Sequelize.STRING(80),
        },
        EMAIL: {
          allowNull: false,
          type: Sequelize.STRING,
        },
        TEL_CONTACTO: {
          allowNull: false,
          type: Sequelize.STRING,
        },
        SEX_USUARIO: {
          allowNull: false,
          type: Sequelize.STRING(11),
        },
        ES_USUARIO: {
          allowNull: false,
          type: Sequelize.STRING(11),
        },
      },
      { logging: console.log }
    );
    await queryInterface.addConstraint("BMAUTH_USUARIO", {
      fields: ["ES_USUARIO"],
      type: "foreign key",
      name: "BMAUTH_USUARIO_FK_ES_USUARIO",
      references: {
        table: "BMAUTH_DEFINICION_D",
        field: "ID_DEFINICION_D",
      },
      onDelete: "no action",
      onUpdate: "cascade",
      logging: console.log,
    });
    await queryInterface.addConstraint("BMAUTH_USUARIO", {
      fields: ["SEX_USUARIO"],
      type: "foreign key",
      name: "BMAUTH_USUARIO_FK_SEX_USUARIO",
      references: {
        table: "BMAUTH_DEFINICION_D",
        field: "ID_DEFINICION_D",
      },
      onDelete: "no action",
      onUpdate: "no action",
      logging: console.log,
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("BMAUTH_USUARIO", {
      logging: console.log,
    });
  },
};