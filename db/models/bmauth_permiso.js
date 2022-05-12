// db/models/bmauth_permiso.js

const moment = require("moment");
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class BMAUTH_PERMISO extends Model {
    static associate(models) {
      this.hasMany(models.bmauth_perfil_permiso, {
        foreignKey: "ID_PERMISO",
        sourceKey: "ID_PERMISO",
      });
      this.belongsTo(models.bmauth_permiso_grupo, {
        as: "BMAUTH_A_G",
        foreignKey: "ID_PERMISO_GRUPO",
        targetKey: "ID_PERMISO_GRUPO",
      });
      this.belongsTo(models.bmauth_permiso_accion, {
        as: "BMAUTH_P_A",
        foreignKey: "ID_PERMISO_ACCION",
        targetKey: "ID_PERMISO_ACCION",
      });
    }
  }
  BMAUTH_PERMISO.init(
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
      ID_PERMISO: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.STRING,
      },
      DE_PERMISO: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      ID_PERMISO_GRUPO: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      ID_PERMISO_ACCION: {
        allowNull: false,
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "BMAUTH_PERMISO",
      tableName: "BMAUTH_PERMISO",
      timestamps: false,
    }
  );
  BMAUTH_PERMISO.removeAttribute("id");
  return BMAUTH_PERMISO;
};