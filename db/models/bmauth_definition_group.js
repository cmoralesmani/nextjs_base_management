// db/models/bmauth_definition_group.js

const moment = require("moment");
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class BMAUTH_DEFINITION_GROUP extends Model {
    static associate(models) {}
  }
  BMAUTH_DEFINITION_GROUP.init(
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
      ID_DEFINITION_GROUP: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.STRING,
      },
      DE_DEFINITION_GROUP: {
        allowNull: false,
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "BMAUTH_DEFINITION_GROUP",
      tableName: "BMAUTH_DEFINITION_GROUP",
      timestamps: false,
    }
  );
  BMAUTH_DEFINITION_GROUP.removeAttribute("id");
  return BMAUTH_DEFINITION_GROUP;
};
