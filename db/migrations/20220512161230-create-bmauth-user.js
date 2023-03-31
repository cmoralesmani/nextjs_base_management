module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      "BMAUTH_USER",
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
        ID_USER: {
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
        NAME_USER: {
          allowNull: false,
          type: Sequelize.STRING(80),
        },
        LASTNAME_USER: {
          allowNull: false,
          type: Sequelize.STRING(80),
        },
        EMAIL: {
          allowNull: false,
          type: Sequelize.STRING,
        },
        PHONE_CONTACT: {
          allowNull: false,
          type: Sequelize.STRING,
        },
        GENDER_USER_ID: {
          allowNull: false,
          type: Sequelize.STRING(11),
        },
        STATUS_USER_ID: {
          allowNull: false,
          type: Sequelize.STRING(11),
        },
      },
      { logging: console.log }
    );
    await queryInterface.addConstraint("BMAUTH_USER", {
      fields: ["STATUS_USER_ID"],
      type: "foreign key",
      name: "BMAUTH_USER_FK_STATUS_USER_ID",
      references: {
        table: "BMAUTH_DEFINITION_DETAIL",
        field: "ID_DEFINITION_DETAIL",
      },
      onDelete: "no action",
      onUpdate: "cascade",
      logging: console.log,
    });
    await queryInterface.addConstraint("BMAUTH_USER", {
      fields: ["GENDER_USER_ID"],
      type: "foreign key",
      name: "BMAUTH_USER_FK_GENDER_USER_ID",
      references: {
        table: "BMAUTH_DEFINITION_DETAIL",
        field: "ID_DEFINITION_DETAIL",
      },
      onDelete: "no action",
      onUpdate: "no action",
      logging: console.log,
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("BMAUTH_USER", {
      logging: console.log,
    });
  },
};
