// db/models/bmauth_definition_crossover.js

const moment = require("moment");
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class BMAUTH_DEFINITION_CROSSOVER extends Model {
    static associate(models) {}
  }
  BMAUTH_DEFINITION_CROSSOVER.init(
    {
      CREATED_AT: {
        allowNull: false,
        type: DataTypes.DATE,
        get() {
          return moment(this.getDataValue("CREATED_AT")).format(
            "YYYY-MM-DD HH:mm:ss"
          );
        },
      },
      CREATED_BY: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      CREATED_IN: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      MODIFIED_AT: {
        allowNull: false,
        type: DataTypes.DATE,
        get() {
          return moment(this.getDataValue("MODIFIED_AT")).format(
            "YYYY-MM-DD HH:mm:ss"
          );
        },
      },
      MODIFIED_BY: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      MODIFIED_IN: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      DEFINITION_DETAIL_ID: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      DEFINITION_GROUP_ID: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      IN_SELF_DEFINITION: {
        allowNull: false,
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "BMAUTH_DEFINITION_CROSSOVER",
      tableName: "BMAUTH_DEFINITION_CROSSOVER",
      timestamps: false,
    }
  );
  // BMAUTH_DEFINITION_CROSSOVER.removeAttribute("id");
  return BMAUTH_DEFINITION_CROSSOVER;
};
