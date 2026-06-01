const express = require("express");
const router = express.Router();
const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/product.controller");
const { validateCreate, validateUpdate } = require("../validators/product.validator");

/**
 * @route   GET /api/products
 * @desc    Listar todos los productos (con paginación y búsqueda)
 * @query   page, limit, search
 * @access  Public
 */
router.get("/", getAllProducts);

/**
 * @route   GET /api/products/:id
 * @desc    Obtener un producto por ID
 * @access  Public
 */
router.get("/:id", getProductById);

/**
 * @route   POST /api/products
 * @desc    Crear un nuevo producto (imagen automática via API externa)
 * @access  Public
 */
router.post("/", validateCreate, createProduct);

/**
 * @route   PUT /api/products/:id
 * @desc    Actualizar un producto existente
 * @access  Public
 */
router.put("/:id", validateUpdate, updateProduct);

/**
 * @route   DELETE /api/products/:id
 * @desc    Eliminar un producto
 * @access  Public
 */
router.delete("/:id", deleteProduct);

module.exports = router;
