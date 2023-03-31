// db/models/index.js

require("dotenv").config();
import getConfig from "next/config";
const { Sequelize, DataTypes } = require("sequelize");

const logger = require("src/services/logger.service");
const envConfigs = require("../config/config");

const { serverRuntimeConfig } = getConfig();

const env = serverRuntimeConfig.NODE_ENV || "development";
const config = envConfigs[env];
const db = {};
const models = [];

let sequelize;
if (config.url) {
  sequelize = new Sequelize(config.url, {
    ...config,
    logging: (sql) => logger.info(sql),
  });
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, {
    ...config,
    logging: (sql) => logger.info(sql),
  });
}

const modules = [
  require("./bmauth_definition_crossover.js"),
  require("./bmauth_definition_detail.js"),
  require("./bmauth_definition_group.js"),
  require("./bmauth_definition_master.js"),
  require("./bmauth_permission.js"),
  require("./bmauth_profile_permissions.js"),
  require("./bmauth_profile.js"),
  require("./bmauth_user_permissions.js"),
  require("./bmauth_user_profiles.js"),
  require("./bmauth_user.js"),
];

modules.forEach((module) => {
  const model = module(sequelize, DataTypes);
  db[model.name.toLowerCase()] = model;
  models.push(model);
});

models.forEach((model) => {
  if (db[model.name.toLowerCase()].associate) {
    db[model.name.toLowerCase()].associate(db);
  }
});

const assertDatabaseConnectionOk = async (req) => {
  try {
    await sequelize.authenticate();
    return true;
  } catch (error) {
    req.log.error(`No se puede conectar a la base de datos.${error}`);
    return false;
  }
};

db.assertDatabaseConnectionOk = assertDatabaseConnectionOk;

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
