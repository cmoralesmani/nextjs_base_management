// db/models/bmauth_definicion_m.js

const moment = require("moment");
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class BMAUTH_DEFINICION_M extends Model {
    static associate(models) {
      this.hasMany(models.bmauth_definicion_d, {
        foreignKey: "ID_DEFINICION_M",
        sourceKey: "ID_DEFINICION_M",
      });
    }
  }
  BMAUTH_DEFINICION_M.init(
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
      ID_DEFINICION_M: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.STRING,
      },
      DE_DEFINICION_M: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      CM_DEFINICION: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      ID_CAMPO: {
        allowNull: false,
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "BMAUTH_DEFINICION_M",
      tableName: "BMAUTH_DEFINICION_M",
      timestamps: false,
    }
  );
  BMAUTH_DEFINICION_M.removeAttribute("id");
  return BMAUTH_DEFINICION_M;
};