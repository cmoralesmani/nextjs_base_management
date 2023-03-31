module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      "BMAUTH_DEFINITION_MASTER",
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
        ID_DEFINITION_MASTER: {
          allowNull: false,
          primaryKey: true,
          type: Sequelize.STRING(5),
        },
        DE_DEFINITION_MASTER: {
          allowNull: false,
          type: Sequelize.STRING(100),
        },
        COMMENT_DEFINITION: {
          allowNull: false,
          type: Sequelize.STRING(300),
        },
        ID_FIELD: {
          allowNull: false,
          type: Sequelize.STRING(100),
        },
      },
      { logging: console.log }
    );
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("BMAUTH_DEFINITION_MASTER", {
      logging: console.log,
    });
  },
};
