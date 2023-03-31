// db/models/bmauth_definition_detail.js

const moment = require("moment");
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class BMAUTH_DEFINITION_DETAIL extends Model {
    static associate(models) {
      this.belongsTo(models.bmauth_definition_master, {
        foreignKey: "DEFINITION_MASTER_ID",
        targetKey: "ID_DEFINITION_MASTER",
      });
      this.hasMany(models.bmauth_user, {
        foreignKey: "STATUS_USER_ID",
        sourceKey: "ID_DEFINITION_DETAIL",
        as: "DEF_STATUS_USER",
      });
      this.hasMany(models.bmauth_user, {
        foreignKey: "GENDER_USER_ID",
        sourceKey: "ID_DEFINITION_DETAIL",
        as: "DEF_GENDER_USER",
      });
      this.hasMany(models.bmauth_profile, {
        foreignKey: "STATUS_PROFILE_ID",
        sourceKey: "ID_DEFINITION_DETAIL",
      });
    }
  }
  BMAUTH_DEFINITION_DETAIL.init(
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
      ID_DEFINITION_DETAIL: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.STRING,
      },
      DEFINITION_MASTER_ID: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      DE_DEFINITION_DETAIL: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      COMMENT_DEFINITION_DETAIL: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      /**
       * WORTHLESS = 'WORTHLESS'
       * WITHINTEGERV = 'value_integer'
       * WITHDECIMALV = 'value_decimal'
       * WITHSTRINGV = 'value_string'
       * WITHDATETIMEV = 'value_datetime'
       */
      TYPE_DEFINITION: {
        allowNull: false,
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "BMAUTH_DEFINITION_DETAIL",
      tableName: "BMAUTH_DEFINITION_DETAIL",
      timestamps: false,
    }
  );
  BMAUTH_DEFINITION_DETAIL.removeAttribute("id");
  return BMAUTH_DEFINITION_DETAIL;
};
