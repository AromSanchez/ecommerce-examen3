const sequelize = require("./db");
const { Product } = require("../models");

const initDB = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ alter: true });
    console.log("Base de datos sincronizada correctamente con Sequelize");
  } catch (err) {
    console.error("Error inicializando la base de datos:", err.message);
    throw err;
  }
};

module.exports = initDB;
