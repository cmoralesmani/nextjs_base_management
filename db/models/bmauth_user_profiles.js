// db/models/bmauth_user_profiles.js

const moment = require("moment");
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class BMAUTH_USER_PROFILES extends Model {
    static associate(models) {
      this.belongsTo(models.bmauth_user, {
        foreignKey: "USER_ID",
        targetKey: "ID_USER",
      });
      this.belongsTo(models.bmauth_profile, {
        foreignKey: "PROFILE_ID",
        targetKey: "ID_PROFILE",
      });
    }
  }
  BMAUTH_USER_PROFILES.init(
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
      USER_ID: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      PROFILE_ID: {
        allowNull: false,
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "BMAUTH_USER_PROFILES",
      tableName: "BMAUTH_USER_PROFILES",
      timestamps: false,
    }
  );
  // BMAUTH_USER_PROFILES.removeAttribute("id");
  return BMAUTH_USER_PROFILES;
};
