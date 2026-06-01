const { Op } = require("sequelize");
const { Product } = require("../models");
const { getRandomImageUrl } = require("../config/externalApi");

// ─────────────────────────────────────────────
//  GET /api/products
//  Lista todos los productos con paginación opcional
// ─────────────────────────────────────────────
const getAllProducts = async (req, res) => {
  try {
    const { page = 1, limit = 20, search } = req.query;
    const offset = (parseInt(page, 10) - 1) * parseInt(limit, 10);

    const where = {};
    if (search) {
      where[Op.or] = [
        { name: { [Op.iLike]: `%${search}%` } },
        { description: { [Op.iLike]: `%${search}%` } },
      ];
    }

    const { rows, count } = await Product.findAndCountAll({
      where,
      order: [["created_at", "DESC"]],
      limit: parseInt(limit, 10),
      offset,
    });

    return res.status(200).json({
      success: true,
      data: rows,
      pagination: {
        total: count,
        page: parseInt(page, 10),
        limit: parseInt(limit, 10),
        totalPages: Math.ceil(count / parseInt(limit, 10)),
      },
    });
  } catch (error) {
    console.error("Error en getAllProducts:", error);
    return res.status(500).json({
      success: false,
      message: "Error al obtener los productos",
      error: error.message,
    });
  }
};

// ─────────────────────────────────────────────
//  GET /api/products/:id
// ─────────────────────────────────────────────
const getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    if (isNaN(id)) {
      return res.status(400).json({ success: false, message: "El ID debe ser un número" });
    }

    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ success: false, message: `Producto con ID ${id} no encontrado` });
    }

    return res.status(200).json({ success: true, data: product });
  } catch (error) {
    console.error("Error en getProductById:", error);
    return res.status(500).json({
      success: false,
      message: "Error al obtener el producto",
      error: error.message,
    });
  }
};

// ─────────────────────────────────────────────
//  POST /api/products
//  Crea producto y obtiene imagen automáticamente de API externa
// ─────────────────────────────────────────────
const createProduct = async (req, res) => {
  try {
    let { name, description, price, stock, image_url } = req.body;

    if (!image_url) {
      console.log("Obteniendo imagen automática de Lorem Picsum...");
      image_url = await getRandomImageUrl();
      console.log("Imagen obtenida:", image_url);
    }

    const product = await Product.create({
      name,
      description: description || null,
      price,
      stock,
      image_url,
    });

    return res.status(201).json({
      success: true,
      message: "Producto creado exitosamente",
      data: product,
    });
  } catch (error) {
    console.error("Error en createProduct:", error);
    return res.status(500).json({
      success: false,
      message: "Error al crear el producto",
      error: error.message,
    });
  }
};

// ─────────────────────────────────────────────
//  PUT /api/products/:id
// ─────────────────────────────────────────────
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    if (isNaN(id)) {
      return res.status(400).json({ success: false, message: "El ID debe ser un número" });
    }

    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ success: false, message: `Producto con ID ${id} no encontrado` });
    }

    const updatedProduct = await product.update(req.body);

    return res.status(200).json({
      success: true,
      message: "Producto actualizado exitosamente",
      data: updatedProduct,
    });
  } catch (error) {
    console.error("Error en updateProduct:", error);
    return res.status(500).json({
      success: false,
      message: "Error al actualizar el producto",
      error: error.message,
    });
  }
};

// ─────────────────────────────────────────────
//  DELETE /api/products/:id
// ─────────────────────────────────────────────
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    if (isNaN(id)) {
      return res.status(400).json({ success: false, message: "El ID debe ser un número" });
    }

    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ success: false, message: `Producto con ID ${id} no encontrado` });
    }

    await product.destroy();

    return res.status(200).json({
      success: true,
      message: `Producto con ID ${id} eliminado exitosamente`,
      data: product,
    });
  } catch (error) {
    console.error("Error en deleteProduct:", error);
    return res.status(500).json({
      success: false,
      message: "Error al eliminar el producto",
      error: error.message,
    });
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
