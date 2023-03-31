module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      "BMAUTH_DEFINITION_CROSSOVER",
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
        DEFINITION_GROUP_ID: {
          allowNull: false,
          type: Sequelize.STRING(11),
        },
        DEFINITION_DETAIL_ID: {
          allowNull: false,
          type: Sequelize.STRING(11),
        },
        IS_SELF_DEFINITION: {
          allowNull: false,
          type: Sequelize.BOOLEAN,
        },
      },
      {
        logging: console.log,
      }
    );
    await queryInterface.addConstraint("BMAUTH_DEFINITION_CROSSOVER", {
      fields: ["DEFINITION_GROUP_ID"],
      type: "foreign key",
      name: "BMAUTH_DEFINITION_CROSSOVER_FK_DEFINITION_GROUP_ID",
      references: {
        table: "BMAUTH_DEFINITION_GROUP",
        field: "ID_DEFINITION_GROUP",
      },
      onDelete: "no action",
      onUpdate: "cascade",
      logging: console.log,
    });
    await queryInterface.addConstraint("BMAUTH_DEFINITION_CROSSOVER", {
      fields: ["DEFINITION_DETAIL_ID"],
      type: "foreign key",
      name: "BMAUTH_DEFINITION_CROSSOVER_FK_DEFINITION_DETAIL_ID",
      references: {
        table: "BMAUTH_DEFINITION_DETAIL",
        field: "ID_DEFINITION_DETAIL",
      },
      onDelete: "no action",
      onUpdate: "cascade",
      logging: console.log,
    });
    await queryInterface.addConstraint("BMAUTH_DEFINITION_CROSSOVER", {
      fields: ["DEFINITION_GROUP_ID", "DEFINITION_DETAIL_ID"],
      type: "unique",
      name: "uk_definition_group_detail",
      logging: console.log,
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("BMAUTH_DEFINITION_CROSSOVER", {
      logging: console.log,
    });
  },
};
