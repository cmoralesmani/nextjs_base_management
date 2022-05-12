// db/config/config.js

require("dotenv").config();

const url_db = process.env.DB_URL.replace("\\$", "$");
const storage_db = process.env.DB_STORAGE;

module.exports = {
  development: {
    url: url_db || null,
    dialect: process.env.DB_DIALECT,
    storage: storage_db || null,
  },
  test: {
    url: url_db || null,
    dialect: process.env.DB_DIALECT,
    storage: storage_db || null,
  },
  production: {
    url: url_db || null,
    dialect: process.env.DB_DIALECT,
    storage: storage_db || null,
  },
};