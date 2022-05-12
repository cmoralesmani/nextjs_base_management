// db/models/bmauth_perfil.js

const moment = require("moment");
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class BMAUTH_PERFIL extends Model {
    static associate(models) {
      this.hasMany(models.bmauth_perfil_permiso, {
        foreignKey: "ID_PERFIL",
        sourceKey: "ID_PERFIL",
      });
      this.hasMany(models.bmauth_usuario_perfil, {
        foreignKey: "ID_PERFIL",
        sourceKey: "ID_PERFIL",
      });
      this.belongsTo(models.bmauth_definicion_d, {
        foreignKey: "ES_PERFIL",
        targetKey: "ID_DEFINICION_D",
      });
    }
  }
  BMAUTH_PERFIL.init(
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
      ID_PERFIL: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.STRING,
      },
      DE_PERFIL: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      ES_PERFIL: {
        allowNull: false,
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "BMAUTH_PERFIL",
      tableName: "BMAUTH_PERFIL",
      timestamps: false,
    }
  );
  BMAUTH_PERFIL.removeAttribute("id");
  return BMAUTH_PERFIL;
};