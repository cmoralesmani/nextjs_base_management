// db/models/bmauth_definicion_p.js

const moment = require("moment");
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class BMAUTH_DEFINICION_P extends Model {
    static associate(models) {
    }
  }
  BMAUTH_DEFINICION_P.init(
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
      FE_INICIO: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.DATEONLY,
      },
      FE_FIN: {
        allowNull: false,
        type: DataTypes.DATEONLY,
      },
      M_VALOR: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      DE_VALOR: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      IN_CAMBIO_EN_APLICACION: {
        allowNull: false,
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "BMAUTH_DEFINICION_P",
      tableName: "BMAUTH_DEFINICION_P",
      timestamps: false,
    }
  );
  BMAUTH_DEFINICION_P.removeAttribute("id");
  return BMAUTH_DEFINICION_P;
};