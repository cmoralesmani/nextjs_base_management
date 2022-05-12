const moment = require("moment");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("BMAUTH_USUARIO", [
      {
        F_CREACION: moment().format("YYYY-MM-DD HH:mm:ss"),
        USR_CREACION: "NINGUNO",
        PROG_CREACION: "NINGUNO",
        F_ACTUAL: moment().format("YYYY-MM-DD HH:mm:ss"),
        USR_ACTUAL: "NINGUNO",
        PROG_ACTUAL: "NINGUNO",
        ID_USUARIO: "d85f9337-809a-4633-b292-c75c5c11ecf4",
        USERNAME: "admin",
        PASSWORD:
          "$2a$10$AC8c5xgv6kASH9IgF1gHJujMxZnNDZ7c7OiL7hx.tmhme6kWX0Nkq", //admin123
        NOM_USUARIO: "Super",
        APE_USUARIO: "Administrador",
        EMAIL: "",
        TEL_CONTACTO: "",
        SEX_USUARIO: "SEX-M",
        ES_USUARIO: "ESCUS-ACTIV",
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("BMAUTH_USUARIO", null, {});
  },
};