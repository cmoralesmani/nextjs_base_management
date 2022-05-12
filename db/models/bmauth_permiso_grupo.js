// db/models/bmauth_permiso_grupo.js

const moment = require("moment");
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class BMAUTH_PERMISO_GRUPO extends Model {
    static associate(models) {
      this.hasMany(models.bmauth_permiso, {
        foreignKey: "ID_PERMISO_GRUPO",
        sourceKey: "ID_PERMISO_GRUPO",
      });
    }
  }
  BMAUTH_PERMISO_GRUPO.init(
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
      ID_PERMISO_GRUPO: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.STRING,
      },
      DE_PERMISO_GRUPO: {
        allowNull: false,
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "BMAUTH_PERMISO_GRUPO",
      tableName: "BMAUTH_PERMISO_GRUPO",
      timestamps: false,
    }
  );
  BMAUTH_PERMISO_GRUPO.removeAttribute("id");
  return BMAUTH_PERMISO_GRUPO;
};