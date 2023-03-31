module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      "BMAUTH_PERMISSION",
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
        ID_PERMISSION: {
          allowNull: false,
          primaryKey: true,
          type: Sequelize.STRING(30),
        },
        DE_PERMISSION: {
          allowNull: false,
          type: Sequelize.STRING(100),
        },
      },
      { logging: console.log }
    );
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("BMAUTH_PERMISSION", {
      logging: console.log,
    });
  },
};
