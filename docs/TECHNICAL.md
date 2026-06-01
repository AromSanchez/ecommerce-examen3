# 📁 Documentación Técnica — Ecommerce API

## Arquitectura del Proyecto

```
ecommerce-api/
├── src/
│   ├── index.js                    # Entry point — Express app
│   ├── config/
│   │   ├── db.js                   # Pool de conexión PostgreSQL (pg)
│   │   ├── initDB.js               # Inicialización de tablas al arranque
│   │   └── externalApi.js          # Consumo de Lorem Picsum / FakeStoreAPI
│   ├── controllers/
│   │   └── product.controller.js   # Lógica de negocio CRUD
│   ├── routes/
│   │   └── product.routes.js       # Definición de rutas Express
│   ├── middleware/
│   │   ├── logger.js               # Morgan HTTP logger
│   │   └── errorHandler.js         # 404 + global error handler
│   └── validators/
│       └── product.validator.js    # Schemas Joi para create/update
├── api/
│   ├── ENDPOINTS.md                # Documentación de todos los endpoints
│   └── ecommerce-api.postman_collection.json
├── docs/
│   └── TECHNICAL.md                # Este archivo
├── .env                            # Variables de entorno (no subir a git)
├── .env.example                    # Template de variables de entorno
├── .gitignore
├── package.json
└── README.md
```

---

## 🗄️ Esquema de Base de Datos

### Tabla: `products`

```sql
CREATE TABLE products (
  id          SERIAL PRIMARY KEY,
  name        VARCHAR(255) NOT NULL,
  description TEXT,
  price       DECIMAL(10, 2) NOT NULL,
  stock       INT NOT NULL DEFAULT 0,
  image_url   VARCHAR(500),
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);
```

> **Nota:** La tabla se crea automáticamente al arrancar el servidor si no existe (ver `src/config/initDB.js`). También se crea un trigger para actualizar `updated_at` en cada UPDATE.

---

## 🌐 API Externa — Lorem Picsum

Al crear un producto sin `image_url`, el sistema:

1. Genera una semilla basada en el timestamp actual
2. Hace una petición HEAD a `https://picsum.photos/seed/{seed}/640/480`
3. Resuelve el redirect para obtener la URL final de la imagen CDN
4. Almacena esa URL en el campo `image_url` del producto

Esto garantiza que cada producto tenga una imagen única y diferente.

**Ejemplo de URL generada:**
```
https://fastly.picsum.photos/id/237/640/480.jpg?hmac=xxx
```

---

## ⚙️ Stack Tecnológico

| Tecnología | Versión  | Uso                              |
|------------|----------|----------------------------------|
| Node.js    | ≥ 18     | Runtime                          |
| Express.js | ^4.18    | Framework HTTP                   |
| pg         | ^8.11    | Adaptador PostgreSQL (node-postgres) |
| Joi        | ^17.11   | Validación de esquemas           |
| Axios      | ^1.6     | HTTP client para API externa     |
| Morgan     | ^1.10    | Middleware de logging HTTP       |
| cors       | ^2.8     | Middleware CORS                  |
| dotenv     | ^16.4    | Variables de entorno             |

---

## 🔒 CORS Configuration

El servidor acepta peticiones de **cualquier origen**:

```javascript
cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
})
```

---

## 🚦 Flujo de una Request POST /api/products

```
Cliente
  │
  ▼
Express Router
  │
  ▼
Joi Validator (validateCreate)
  ├─ Falla → 400 Bad Request con lista de errores
  │
  ▼
product.controller.js → createProduct()
  │
  ├── ¿image_url en body?
  │     SÍ → usa la proporcionada
  │     NO  → getRandomImageUrl() → Lorem Picsum API
  │
  ▼
pool.query(INSERT INTO products...)
  │
  ▼
201 Created + producto creado
```

---

## 🌍 Variables de Entorno

| Variable       | Descripción                      | Requerida |
|----------------|----------------------------------|-----------|
| `PORT`         | Puerto del servidor (default 3000) | ❌      |
| `NODE_ENV`     | `development` o `production`     | ❌        |
| `DATABASE_URL` | URL completa de PostgreSQL       | ✅        |
| `DB_HOST`      | Host de PostgreSQL               | ✅*       |
| `DB_PORT`      | Puerto PostgreSQL (default 5432) | ✅*       |
| `DB_NAME`      | Nombre de la base de datos       | ✅*       |
| `DB_USER`      | Usuario de PostgreSQL            | ✅*       |
| `DB_PASSWORD`  | Contraseña de PostgreSQL         | ✅*       |

> *Sólo necesarios si no se usa `DATABASE_URL`. Se recomienda usar `DATABASE_URL`.

---

## 🚀 Despliegue en Render

1. Crea un nuevo **Web Service** en [render.com](https://render.com)
2. Conecta tu repositorio de GitHub
3. Configura:
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
4. Agrega la variable de entorno `DATABASE_URL` con la External URL de tu PostgreSQL
5. Deploy!
