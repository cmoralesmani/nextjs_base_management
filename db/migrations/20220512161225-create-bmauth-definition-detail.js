module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      "BMAUTH_DEFINITION_DETAIL",
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
        ID_DEFINITION_DETAIL: {
          allowNull: false,
          primaryKey: true,
          type: Sequelize.STRING(11),
        },
        DEFINITION_MASTER_ID: {
          allowNull: false,
          type: Sequelize.STRING(5),
        },
        DE_DEFINITION_DETAIL: {
          allowNull: false,
          type: Sequelize.STRING(255),
        },
        COMMENT_DEFINITION_DETAIL: {
          allowNull: false,
          type: Sequelize.STRING(300),
        },
        TYPE_DEFINITION: {
          allowNull: false,
          type: Sequelize.STRING(15),
        },
        VALUE_INTEGER: {
          allowNull: true,
          type: Sequelize.INTEGER,
        },
        VALUE_DECIMAL: {
          allowNull: true,
          type: Sequelize.DECIMAL(20, 9),
        },
        VALUE_STRING: {
          allowNull: true,
          type: Sequelize.STRING(255),
        },
        VALUE_DATETIME: {
          allowNull: true,
          type: Sequelize.DATE,
        },
      },
      { logging: console.log }
    );
    await queryInterface.addConstraint("BMAUTH_DEFINITION_DETAIL", {
      fields: ["DEFINITION_MASTER_ID"],
      type: "foreign key",
      name: "BMAUTH_DEFINITION_DETAIL_FK_DEFINITION_MASTER_ID",
      references: {
        table: "BMAUTH_DEFINITION_MASTER",
        field: "ID_DEFINITION_MASTER",
      },
      onDelete: "no action",
      onUpdate: "cascade",
      logging: console.log,
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("BMAUTH_DEFINITION_DETAIL", {
      logging: console.log,
    });
  },
};
