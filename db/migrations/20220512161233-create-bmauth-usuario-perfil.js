module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      "BMAUTH_USUARIO_PERFIL",
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
        ID_PERFIL: {
          allowNull: false,
          primaryKey: true,
          type: Sequelize.STRING(5),
        },
      },
      { logging: console.log }
    );
    await queryInterface.addConstraint("BMAUTH_USUARIO_PERFIL", {
      fields: ["ID_USUARIO"],
      type: "foreign key",
      name: "BMAUTH_USUARIO_PERFIL_FK_ID_USUARIO",
      references: {
        table: "BMAUTH_USUARIO",
        field: "ID_USUARIO",
      },
      onDelete: "no action",
      onUpdate: "cascade",
      logging: console.log,
    });
    await queryInterface.addConstraint("BMAUTH_USUARIO_PERFIL", {
      fields: ["ID_PERFIL"],
      type: "foreign key",
      name: "BMAUTH_USUARIO_PERFIL_FK_ID_PERFIL",
      references: {
        table: "BMAUTH_PERFIL",
        field: "ID_PERFIL",
      },
      onDelete: "no action",
      onUpdate: "no action",
      logging: console.log,
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("BMAUTH_USUARIO_PERFIL", {
      logging: console.log,
    });
  },
};