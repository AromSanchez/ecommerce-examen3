const sequelize = require("../config/db");
const defineProduct = require("./product.model");

const Product = defineProduct(sequelize);

module.exports = {
  sequelize,
  Product,
};
