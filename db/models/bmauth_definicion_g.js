// db/models/bmauth_definicion_g.js

const moment = require("moment");
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class BMAUTH_DEFINICION_G extends Model {
    static associate(models) {
    }
  }
  BMAUTH_DEFINICION_G.init(
    {
      F_CREACION: {
        allowNull: false,
        type: DataTypes.DATE,
        get() {
          return moment(this.getDataValue("F_CREACION")).format(
            "YYYY-MM-DD HH:mm:ss"
          );
        },
      },
      USR_CREACION: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      PROG_CREACION: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      F_ACTUAL: {
        allowNull: false,
        type: DataTypes.DATE,
        get() {
          return moment(this.getDataValue("F_ACTUAL")).format(
            "YYYY-MM-DD HH:mm:ss"
          );
        },
      },
      USR_ACTUAL: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      PROG_ACTUAL: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      ID_DEFINICION_D: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.STRING,
      },
      ID_DEFINICION_X: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.STRING,
      },
      IN_DEFINICION_PROPIO: {
        allowNull: false,
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "BMAUTH_DEFINICION_G",
      tableName: "BMAUTH_DEFINICION_G",
      timestamps: false,
    }
  );
  BMAUTH_DEFINICION_G.removeAttribute("id");
  return BMAUTH_DEFINICION_G;
};