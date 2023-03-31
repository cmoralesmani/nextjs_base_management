// db/models/bmauth_user.js

var bcrypt = require("bcryptjs");
const moment = require("moment");
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class BMAUTH_USER extends Model {
    static associate(models) {
      this.hasMany(models.bmauth_user_profiles, {
        foreignKey: "USER_ID",
        sourceKey: "ID_USER",
      });
      this.hasMany(models.bmauth_user_permissions, {
        foreignKey: "USER_ID",
        sourceKey: "ID_USER",
      });
      this.belongsTo(models.bmauth_definition_detail, {
        foreignKey: "STATUS_USER_ID",
        targetKey: "ID_DEFINITION_DETAIL",
        as: "DEF_STATUS_USER",
      });
      this.belongsTo(models.bmauth_definition_detail, {
        foreignKey: "GENDER_USER_ID",
        targetKey: "ID_DEFINITION_DETAIL",
        as: "DEF_GENDER_USER",
      });
    }
  }
  BMAUTH_USER.init(
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
      ID_USER: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
      },
      USERNAME: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      PASSWORD: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      NAME_USER: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      LASTNAME_USER: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      EMAIL: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      PHONE_CONTACT: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      GENDER_USER_ID: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      STATUS_USER_ID: {
        allowNull: false,
        type: DataTypes.STRING,
      },
    },
    {
      hooks: {
        beforeCreate: async function (instance, options) {
          instance.PASSWORD = await bcrypt.hashSync(instance.PASSWORD, 10);
        },
        beforeBulkCreate: async function (instance, options) {
          instance.PASSWORD = await bcrypt.hashSync(instance.PASSWORD, 10);
        },
      },
      sequelize,
      modelName: "BMAUTH_USER",
      tableName: "BMAUTH_USER",
      timestamps: false,
    }
  );
  BMAUTH_USER.removeAttribute("id");
  return BMAUTH_USER;
};
