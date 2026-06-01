require("dotenv").config();
const express = require("express");
const cors = require("cors");

const logger = require("./middleware/logger");
const { notFound, errorHandler } = require("./middleware/errorHandler");
const productRoutes = require("./routes/product.routes");
const initDB = require("./config/initDB");

const app = express();
const PORT = process.env.PORT || 3000;

// ─────────────────────────────────────────────
//  MIDDLEWARES GLOBALES
// ─────────────────────────────────────────────

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
    credentials: false,
  })
);

// Pre-flight para todas las rutas
app.options("*", cors());

// Parsear JSON y URL-encoded
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Logging HTTP
app.use(logger);

// ─────────────────────────────────────────────
//  RUTAS
// ─────────────────────────────────────────────

// Health check
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "🚀 Ecommerce API funcionando correctamente",
    version: "1.0.0",
    endpoints: {
      products: "/api/products",
      health: "/api/health",
    },
  });
});

const sequelize = require("./config/db");

app.get("/api/health", async (req, res) => {
  try {
    await sequelize.authenticate();
    res.json({
      success: true,
      status: "healthy",
      database: "connected",
      timestamp: new Date().toISOString(),
    });
  } catch (err) {
    res.status(503).json({
      success: false,
      status: "unhealthy",
      database: "disconnected",
      error: err.message,
    });
  }
});

// Rutas de productos
app.use("/api/products", productRoutes);

// ─────────────────────────────────────────────
//  MANEJO DE ERRORES (deben ir al final)
// ─────────────────────────────────────────────
app.use(notFound);
app.use(errorHandler);

// ─────────────────────────────────────────────
//  INICIO DEL SERVIDOR
// ─────────────────────────────────────────────
const start = async () => {
  try {
    await initDB();
    app.listen(PORT, () => {
      console.log(`\n🚀 Servidor corriendo en http://localhost:${PORT}`);
      console.log(`📦 Entorno: ${process.env.NODE_ENV || "development"}`);
      console.log(`📋 API Docs: http://localhost:${PORT}/api/products\n`);
    });
  } catch (error) {
    console.error("❌ Error al iniciar el servidor:", error.message);
    process.exit(1);
  }
};

start();

module.exports = app;
