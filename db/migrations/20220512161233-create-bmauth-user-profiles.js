module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      "BMAUTH_USER_PROFILES",
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
        PROFILE_ID: {
          allowNull: false,
          type: Sequelize.STRING(5),
        },
      },
      { logging: console.log }
    );
    await queryInterface.addConstraint("BMAUTH_USER_PROFILES", {
      fields: ["USER_ID"],
      type: "foreign key",
      name: "BMAUTH_USER_PROFILES_FK_USER_ID",
      references: {
        table: "BMAUTH_USER",
        field: "ID_USER",
      },
      onDelete: "no action",
      onUpdate: "cascade",
      logging: console.log,
    });
    await queryInterface.addConstraint("BMAUTH_USER_PROFILES", {
      fields: ["PROFILE_ID"],
      type: "foreign key",
      name: "BMAUTH_USER_PROFILES_FK_PROFILE_ID",
      references: {
        table: "BMAUTH_PROFILE",
        field: "ID_PROFILE",
      },
      onDelete: "no action",
      onUpdate: "no action",
      logging: console.log,
    });
    await queryInterface.addConstraint("BMAUTH_USER_PROFILES", {
      fields: ["USER_ID", "PROFILE_ID"],
      type: "unique",
      name: "uk_user_profiles",
      logging: console.log,
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("BMAUTH_USER_PROFILES", {
      logging: console.log,
    });
  },
};
