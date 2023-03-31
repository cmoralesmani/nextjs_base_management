module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      "BMAUTH_USER_PERMISSIONS",
      {
        CREATED_AT: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        CREATED_BY: {
          allowNull: false,
          type: Sequelize.STRING(30),
        },
        CREATED_IN: {
          allowNull: false,
          type: Sequelize.STRING(15),
        },
        MODIFIED_AT: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        MODIFIED_BY: {
          allowNull: false,
          type: Sequelize.STRING(30),
        },
        MODIFIED_IN: {
          allowNull: false,
          type: Sequelize.STRING(15),
        },
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        USER_ID: {
          allowNull: false,
          type: Sequelize.UUID,
        },
        PERMISSION_ID: {
          allowNull: false,
          type: Sequelize.STRING(30),
        },
      },
      { logging: console.log }
    );
    await queryInterface.addConstraint("BMAUTH_USER_PERMISSIONS", {
      fields: ["USER_ID"],
      type: "foreign key",
      name: "BMAUTH_USER_PERMISSIONS_FK_USER_ID",
      references: {
        table: "BMAUTH_USER",
        field: "ID_USER",
      },
      onDelete: "no action",
      onUpdate: "cascade",
      logging: console.log,
    });
    await queryInterface.addConstraint("BMAUTH_USER_PERMISSIONS", {
      fields: ["PERMISSION_ID"],
      type: "foreign key",
      name: "BMAUTH_USER_PERMISSIONS_FK_PERMISSION_ID",
      references: {
        table: "BMAUTH_PERMISSION",
        field: "ID_PERMISSION",
      },
      onDelete: "no action",
      onUpdate: "cascade",
      logging: console.log,
    });
    await queryInterface.addConstraint("BMAUTH_USER_PERMISSIONS", {
      fields: ["USER_ID", "PERMISSION_ID"],
      type: "unique",
      name: "uk_user_permissions",
      logging: console.log,
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("BMAUTH_USER_PERMISSIONS", {
      logging: console.log,
    });
  },
};
