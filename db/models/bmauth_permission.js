// db/models/bmauth_permission.js

const moment = require("moment");
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class BMAUTH_PERMISSION extends Model {
    static associate(models) {
      this.hasMany(models.bmauth_profile_permissions, {
        foreignKey: "PERMISSION_ID",
        sourceKey: "ID_PERMISSION",
      });
      this.hasMany(models.bmauth_user_permissions, {
        foreignKey: "PERMISSION_ID",
        sourceKey: "ID_PERMISSION",
      });
    }
  }
  BMAUTH_PERMISSION.init(
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
      ID_PERMISSION: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.STRING,
      },
      DE_PERMISSION: {
        allowNull: false,
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "BMAUTH_PERMISSION",
      tableName: "BMAUTH_PERMISSION",
      timestamps: false,
    }
  );
  BMAUTH_PERMISSION.removeAttribute("id");
  return BMAUTH_PERMISSION;
};
