module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      "BMAUTH_PERMISO",
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
        ID_PERMISO: {
          allowNull: false,
          primaryKey: true,
          type: Sequelize.STRING(11),
        },
        DE_PERMISO: {
          allowNull: false,
          type: Sequelize.STRING(100),
        },
        ID_PERMISO_GRUPO: {
          allowNull: false,
          type: Sequelize.STRING(5),
        },
        ID_PERMISO_ACCION: {
          allowNull: false,
          type: Sequelize.STRING(5),
        },
      },
      { logging: console.log }
    );
    await queryInterface.addConstraint("BMAUTH_PERMISO", {
      fields: ["ID_PERMISO_GRUPO"],
      type: "foreign key",
      name: "BMAUTH_PERMISO_FK_ID_PERMISO_GRUPO",
      references: {
        table: "BMAUTH_PERMISO_GRUPO",
        field: "ID_PERMISO_GRUPO",
      },
      onDelete: "no action",
      onUpdate: "cascade",
      logging: console.log,
    });
    await queryInterface.addConstraint("BMAUTH_PERMISO", {
      fields: ["ID_PERMISO_ACCION"],
      type: "foreign key",
      name: "BMAUTH_PERMISO_FK_ID_PERMISO_ACCION",
      references: {
        table: "BMAUTH_PERMISO_ACCION",
        field: "ID_PERMISO_ACCION",
      },
      onDelete: "no action",
      onUpdate: "no action",
      logging: console.log,
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("BMAUTH_PERMISO", {
      logging: console.log,
    });
  },
};