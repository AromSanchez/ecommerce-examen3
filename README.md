# 🛒 Ecommerce API

API RESTful para gestión de productos de un ecommerce, construida con **Express.js** y **PostgreSQL**. Incluye consumo automático de imágenes desde la API externa [Lorem Picsum](https://picsum.photos) al crear productos.

---

## 🚀 URL del Proyecto en Línea

> ⚠️ **Pendiente de despliegue** — Actualiza esta sección con la URL de Render/Railway una vez desplegado.
> 
> Ejemplo: `https://ecommerce-api.onrender.com`

---

## ✨ Características

- ✅ CRUD completo de productos (`/api/products`)
- ✅ Imagen automática via **Lorem Picsum** al crear un producto
- ✅ Validación de datos con **Joi**
- ✅ Middleware de logging con **Morgan**
- ✅ Manejo global de errores y rutas no encontradas
- ✅ **CORS abierto** — acepta peticiones de cualquier frontend
- ✅ Paginación y búsqueda de productos
- ✅ Tabla creada automáticamente al iniciar

---

## 📋 Requisitos Previos

- Node.js >= 18
- npm >= 9
- Una base de datos PostgreSQL (incluida en las credenciales del proyecto)

---

## ⚙️ Instalación Local

```bash
# 1. Clona el repositorio
git clone https://github.com/TU_USUARIO/ecommerce-api.git
cd ecommerce-api

# 2. Instala dependencias
npm install

# 3. Configura las variables de entorno
cp .env.example .env
# Edita .env con tus credenciales de PostgreSQL

# 4. Inicia en modo desarrollo
npm run dev

# O en modo producción
npm start
```

El servidor estará disponible en `http://localhost:3000`

---

## 🔑 Variables de Entorno

Crea un archivo `.env` en la raíz con:

```env
PORT=3000
NODE_ENV=development
DATABASE_URL=postgresql://usuario:contraseña@host/base_de_datos
```

---

## 📦 Estructura del Proyecto

```
ecommerce-api/
├── src/
│   ├── index.js                 # Servidor Express
│   ├── config/
│   │   ├── db.js                # Conexión PostgreSQL
│   │   ├── initDB.js            # Crea tabla al iniciar
│   │   └── externalApi.js       # Consumo de Lorem Picsum
│   ├── controllers/
│   │   └── product.controller.js
│   ├── routes/
│   │   └── product.routes.js
│   ├── middleware/
│   │   ├── logger.js
│   │   └── errorHandler.js
│   └── validators/
│       └── product.validator.js
├── api/
│   ├── ENDPOINTS.md             # Documentación detallada de la API
│   └── ecommerce-api.postman_collection.json
├── docs/
│   └── TECHNICAL.md             # Documentación técnica
└── README.md
```

---

## 🌐 Endpoints de la API

| Método   | Endpoint             | Descripción                              |
|----------|----------------------|------------------------------------------|
| `GET`    | `/api/products`      | Listar todos los productos (paginado)    |
| `GET`    | `/api/products/:id`  | Obtener producto por ID                  |
| `POST`   | `/api/products`      | Crear producto (imagen auto desde Picsum)|
| `PUT`    | `/api/products/:id`  | Actualizar producto                      |
| `DELETE` | `/api/products/:id`  | Eliminar producto                        |
| `GET`    | `/api/health`        | Estado del servidor y BD                 |

---

## 📡 Ejemplos de Llamadas a la API

### Listar productos
```bash
curl http://localhost:3000/api/products?page=1&limit=5
```

### Obtener producto por ID
```bash
curl http://localhost:3000/api/products/1
```

### Crear producto (imagen automática)
```bash
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Laptop Gamer",
    "description": "Laptop de alto rendimiento",
    "price": 1299.99,
    "stock": 10
  }'
```

### Crear producto con imagen manual
```bash
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Teclado Mecánico",
    "price": 89.99,
    "stock": 30,
    "image_url": "https://picsum.photos/seed/teclado/640/480"
  }'
```

### Actualizar producto
```bash
curl -X PUT http://localhost:3000/api/products/1 \
  -H "Content-Type: application/json" \
  -d '{
    "price": 1199.99,
    "stock": 8
  }'
```

### Eliminar producto
```bash
curl -X DELETE http://localhost:3000/api/products/1
```

### Health check
```bash
curl http://localhost:3000/api/health
```

---

## 🧪 Colección Postman

Importa el archivo `api/ecommerce-api.postman_collection.json` en Postman para tener todos los endpoints listos para probar.

---

## 🚀 Despliegue en Render

1. Sube el código a GitHub
2. Ve a [render.com](https://render.com) → **New Web Service**
3. Conecta tu repo y configura:
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
4. Agrega la variable de entorno `DATABASE_URL`
5. ¡Deploy!

---

## 🛠️ Tecnologías

- **Express.js** — Framework web
- **PostgreSQL + pg** — Base de datos
- **Joi** — Validación de datos
- **Axios** — HTTP client para API externa
- **Morgan** — Logger HTTP
- **cors** — CORS middleware
- **dotenv** — Variables de entorno

---

## 📄 Licencia

MIT
