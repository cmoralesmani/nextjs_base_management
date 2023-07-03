const moment = require("moment");
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class BMAUTH_PROFILE_PERMISSIONS extends Model {
    static associate(models) {
      this.belongsTo(models.bmauth_profile, {
        foreignKey: "PROFILE_ID",
        targetKey: "ID_PROFILE",
      });
      this.belongsTo(models.bmauth_permission, {
        foreignKey: "PERMISSION_ID",
        targetKey: "ID_PERMISSION",
      });
    }
  }
  BMAUTH_PROFILE_PERMISSIONS.init(
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
      PROFILE_ID: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      PERMISSION_ID: {
        allowNull: false,
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "BMAUTH_PROFILE_PERMISSIONS",
      tableName: "BMAUTH_PROFILE_PERMISSIONS",
      timestamps: false,
    }
  );
  // BMAUTH_PROFILE_PERMISSIONS.removeAttribute("id");
  return BMAUTH_PROFILE_PERMISSIONS;
};
