const { Sequelize } = require("sequelize");
require("dotenv").config();

const useSsl = process.env.DB_SSL === "true";

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  protocol: "postgres",
  logging: false,
  dialectOptions: useSsl
    ? {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
      }
    : {},
});

const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Conectado a PostgreSQL (Sequelize) exitosamente");
  } catch (error) {
    console.error("❌ Error conectando a PostgreSQL (Sequelize):", error.message);
  }
};

testConnection();

module.exports = sequelize;
