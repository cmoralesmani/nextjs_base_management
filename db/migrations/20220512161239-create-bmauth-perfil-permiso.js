module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      "BMAUTH_PERFIL_PERMISO",
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
        ID_PERMISO: {
          allowNull: false,
          primaryKey: true,
          type: Sequelize.STRING(11),
        },
      },
      { logging: console.log }
    );
    await queryInterface.addConstraint("BMAUTH_PERFIL_PERMISO", {
      fields: ["ID_PERFIL"],
      type: "foreign key",
      name: "BMAUTH_PERFIL_PERMISO_FK_ID_PERFIL",
      references: {
        table: "BMAUTH_PERFIL",
        field: "ID_PERFIL",
      },
      onDelete: "no action",
      onUpdate: "cascade",
      logging: console.log,
    });
    await queryInterface.addConstraint("BMAUTH_PERFIL_PERMISO", {
      fields: ["ID_PERMISO"],
      type: "foreign key",
      name: "BMAUTH_PERFIL_PERMISO_FK_ID_PERMISO",
      references: {
        table: "BMAUTH_PERMISO",
        field: "ID_PERMISO",
      },
      onDelete: "no action",
      onUpdate: "no action",
      logging: console.log,
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("BMAUTH_PERFIL_PERMISO", {
      logging: console.log,
    });
  },
};