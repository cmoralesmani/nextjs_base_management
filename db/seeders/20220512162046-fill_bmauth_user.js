const moment = require("moment");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("BMAUTH_USER", [
      {
        CREATED_AT: moment().format("YYYY-MM-DD HH:mm:ss"),
        CREATED_BY: "NINGUNO",
        CREATED_IN: "NINGUNO",
        MODIFIED_AT: moment().format("YYYY-MM-DD HH:mm:ss"),
        MODIFIED_BY: "NINGUNO",
        MODIFIED_IN: "NINGUNO",
        ID_USER: "d85f9337-809a-4633-b292-c75c5c11ecf4",
        USERNAME: "admin",
        PASSWORD:
          "$2a$10$AC8c5xgv6kASH9IgF1gHJujMxZnNDZ7c7OiL7hx.tmhme6kWX0Nkq", //admin123
        NAME_USER: "Super",
        LASTNAME_USER: "Administrador",
        EMAIL: "",
        PHONE_CONTACT: "",
        GENDER_USER_ID: "SEX-M",
        STATUS_USER_ID: "ESCUS-ACTIV",
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("BMAUTH_USER", null, {});
  },
};
