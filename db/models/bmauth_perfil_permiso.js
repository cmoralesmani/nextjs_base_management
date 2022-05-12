// db/models/bmauth_perfil_permiso.js

const moment = require("moment");
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class BMAUTH_PERFIL_PERMISO extends Model {
    static associate(models) {
      this.belongsTo(models.bmauth_perfil, {
        foreignKey: "ID_PERFIL",
        targetKey: "ID_PERFIL",
      });
      this.belongsTo(models.bmauth_permiso, {
        foreignKey: "ID_PERMISO",
        targetKey: "ID_PERMISO",
      });
    }
  }
  BMAUTH_PERFIL_PERMISO.init(
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
      ID_PERMISO: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "BMAUTH_PERFIL_PERMISO",
      tableName: "BMAUTH_PERFIL_PERMISO",
      timestamps: false,
    }
  );
  BMAUTH_PERFIL_PERMISO.removeAttribute("id");
  return BMAUTH_PERFIL_PERMISO;
};