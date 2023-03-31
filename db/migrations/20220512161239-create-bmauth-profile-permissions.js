module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      "BMAUTH_PROFILE_PERMISSIONS",
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
        PROFILE_ID: {
          allowNull: false,
          type: Sequelize.STRING(5),
        },
        PERMISSION_ID: {
          allowNull: false,
          type: Sequelize.STRING(30),
        },
      },
      { logging: console.log }
    );
    await queryInterface.addConstraint("BMAUTH_PROFILE_PERMISSIONS", {
      fields: ["PROFILE_ID"],
      type: "foreign key",
      name: "BMAUTH_PROFILE_PERMISSIONS_FK_PROFILE_ID",
      references: {
        table: "BMAUTH_PROFILE",
        field: "ID_PROFILE",
      },
      onDelete: "no action",
      onUpdate: "cascade",
      logging: console.log,
    });
    await queryInterface.addConstraint("BMAUTH_PROFILE_PERMISSIONS", {
      fields: ["PERMISSION_ID"],
      type: "foreign key",
      name: "BMAUTH_PROFILE_PERMISSIONS_FK_PERMISSION_ID",
      references: {
        table: "BMAUTH_PERMISSION",
        field: "ID_PERMISSION",
      },
      onDelete: "no action",
      onUpdate: "no action",
      logging: console.log,
    });
    await queryInterface.addConstraint("BMAUTH_PROFILE_PERMISSIONS", {
      fields: ["PROFILE_ID", "PERMISSION_ID"],
      type: "unique",
      name: "uk_profile_permissions",
      logging: console.log,
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("BMAUTH_PROFILE_PERMISSIONS", {
      logging: console.log,
    });
  },
};
