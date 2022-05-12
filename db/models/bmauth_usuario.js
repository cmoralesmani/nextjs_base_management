// db/models/bmauth_usuario.js

var bcrypt = require("bcryptjs");
const moment = require("moment");
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class BMAUTH_USUARIO extends Model {
    static associate(models) {
      this.hasMany(models.bmauth_usuario_perfil, {
        foreignKey: "ID_USUARIO",
        sourceKey: "ID_USUARIO",
      });
      this.belongsTo(models.bmauth_definicion_d, {
        foreignKey: "ES_USUARIO",
        targetKey: "ID_DEFINICION_D",
        as: "DEF_ES_USUARIO",
      });
      this.belongsTo(models.bmauth_definicion_d, {
        foreignKey: "SEX_USUARIO",
        targetKey: "ID_DEFINICION_D",
        as: "DEF_SEX_USUARIO",
      });
    }
  }
  BMAUTH_USUARIO.init(
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
        type: DataTypes.UUID,
      },
      USERNAME: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      PASSWORD: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      NOM_USUARIO: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      APE_USUARIO: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      EMAIL: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      TEL_CONTACTO: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      SEX_USUARIO: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      ES_USUARIO: {
        allowNull: false,
        type: DataTypes.STRING,
      },
    },
    {
      hooks: {
        beforeCreate: async function (instance, options) {
          instance.PASSWORD = await bcrypt.hashSync(instance.PASSWORD, 10);
        },
        beforeBulkCreate: async function (instance, options) {
          instance.PASSWORD = await bcrypt.hashSync(instance.PASSWORD, 10);
        },
      },
      sequelize,
      modelName: "BMAUTH_USUARIO",
      tableName: "BMAUTH_USUARIO",
      timestamps: false,
    }
  );
  BMAUTH_USUARIO.removeAttribute("id");
  return BMAUTH_USUARIO;
};