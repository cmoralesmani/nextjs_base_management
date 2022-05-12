// db/models/bmauth_usuario_perfil.js

const moment = require("moment");
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class BMAUTH_USUARIO_PERFIL extends Model {
    static associate(models) {
      this.belongsTo(models.bmauth_usuario, {
        foreignKey: "ID_USUARIO",
        targetKey: "ID_USUARIO",
      });
      this.belongsTo(models.bmauth_perfil, {
        foreignKey: "ID_PERFIL",
        targetKey: "ID_PERFIL",
      });
    }
  }
  BMAUTH_USUARIO_PERFIL.init(
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
      ID_USUARIO: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.STRING,
      },
      ID_PERFIL: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "BMAUTH_USUARIO_PERFIL",
      tableName: "BMAUTH_USUARIO_PERFIL",
      timestamps: false,
    }
  );
  BMAUTH_USUARIO_PERFIL.removeAttribute("id");
  return BMAUTH_USUARIO_PERFIL;
};