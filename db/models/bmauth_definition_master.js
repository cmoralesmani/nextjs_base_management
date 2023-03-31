// db/models/bmauth_definition_master.js

const moment = require("moment");
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class BMAUTH_DEFINITION_MASTER extends Model {
    static associate(models) {
      this.hasMany(models.bmauth_definition_detail, {
        foreignKey: "DEFINITION_MASTER_ID",
        sourceKey: "ID_DEFINITION_MASTER",
      });
    }
  }
  BMAUTH_DEFINITION_MASTER.init(
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
      ID_DEFINITION_MASTER: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.STRING,
      },
      DE_DEFINITION_MASTER: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      COMMENT_DEFINITION: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      ID_FIELD: {
        allowNull: false,
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "BMAUTH_DEFINITION_MASTER",
      tableName: "BMAUTH_DEFINITION_MASTER",
      timestamps: false,
    }
  );
  BMAUTH_DEFINITION_MASTER.removeAttribute("id");
  return BMAUTH_DEFINITION_MASTER;
};
