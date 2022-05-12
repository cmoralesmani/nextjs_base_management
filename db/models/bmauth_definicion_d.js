// db/models/bmauth_definicion_d.js

const moment = require("moment");
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class BMAUTH_DEFINICION_D extends Model {
    static associate(models) {
      this.belongsTo(models.bmauth_definicion_m, {
        foreignKey: "ID_DEFINICION_M",
        targetKey: "ID_DEFINICION_M",
      });
      this.hasMany(models.bmauth_usuario, {
        foreignKey: "ES_USUARIO",
        sourceKey: "ID_DEFINICION_D",
        as: "DEF_ES_USUARIO",
      });
      this.hasMany(models.bmauth_usuario, {
        foreignKey: "SEX_USUARIO",
        sourceKey: "ID_DEFINICION_D",
        as: "DEF_SEX_USUARIO",
      });
      this.hasMany(models.bmauth_perfil, {
        foreignKey: "ES_PERFIL",
        sourceKey: "ID_DEFINICION_D",
      });
    }
  }
  BMAUTH_DEFINICION_D.init(
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
      ID_DEFINICION_M: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      DE_DEFINICION_D: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      CM_DEFINICION_D: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      TI_DEFINICION: {
        allowNull: false,
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "BMAUTH_DEFINICION_D",
      tableName: "BMAUTH_DEFINICION_D",
      timestamps: false,
    }
  );
  BMAUTH_DEFINICION_D.removeAttribute("id");
  return BMAUTH_DEFINICION_D;
};