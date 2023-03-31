// db/models/bmauth_profile.js

const moment = require("moment");
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class BMAUTH_PROFILE extends Model {
    static associate(models) {
      this.hasMany(models.bmauth_profile_permissions, {
        foreignKey: "PROFILE_ID",
        sourceKey: "ID_PROFILE",
      });
      this.hasMany(models.bmauth_user_profiles, {
        foreignKey: "PROFILE_ID",
        sourceKey: "ID_PROFILE",
      });
      this.belongsTo(models.bmauth_definition_detail, {
        foreignKey: "STATUS_PROFILE_ID",
        targetKey: "ID_DEFINITION_DETAIL",
      });
    }
  }
  BMAUTH_PROFILE.init(
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
      ID_PROFILE: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.STRING,
      },
      DE_PROFILE: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      STATUS_PROFILE_ID: {
        allowNull: false,
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "BMAUTH_PROFILE",
      tableName: "BMAUTH_PROFILE",
      timestamps: false,
    }
  );
  BMAUTH_PROFILE.removeAttribute("id");
  return BMAUTH_PROFILE;
};
