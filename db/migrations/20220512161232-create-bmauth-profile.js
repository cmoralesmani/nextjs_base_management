module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      "BMAUTH_PROFILE",
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
        ID_PROFILE: {
          allowNull: false,
          primaryKey: true,
          type: Sequelize.STRING(5),
        },
        DE_PROFILE: {
          allowNull: false,
          type: Sequelize.STRING(100),
        },
        STATUS_PROFILE_ID: {
          allowNull: false,
          type: Sequelize.STRING(11),
        },
      },
      { logging: console.log }
    );
    await queryInterface.addConstraint("BMAUTH_PROFILE", {
      fields: ["STATUS_PROFILE_ID"],
      type: "foreign key",
      name: "BMAUTH_PROFILE_FK_STATUS_PROFILE_ID",
      references: {
        table: "BMAUTH_DEFINITION_DETAIL",
        field: "ID_DEFINITION_DETAIL",
      },
      onDelete: "no action",
      onUpdate: "cascade",
      logging: console.log,
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("BMAUTH_PROFILE", {
      logging: console.log,
    });
  },
};
