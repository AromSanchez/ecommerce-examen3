# 📦 API Reference - Ecommerce API

**Base URL:** `http://localhost:3000` (local) | `https://TU-APP.onrender.com` (producción)

---

## 🔐 Autenticación

Esta API es pública. No requiere token ni autenticación.

---

## 📋 Endpoints de Productos

### `GET /api/products`

Lista todos los productos. Soporta paginación y búsqueda.

**Query Params (opcionales):**

| Parámetro | Tipo   | Default | Descripción                     |
|-----------|--------|---------|----------------------------------|
| `page`    | number | 1       | Número de página                |
| `limit`   | number | 20      | Resultados por página           |
| `search`  | string | -       | Filtrar por nombre o descripción |

**Ejemplo de request:**
```
GET /api/products?page=1&limit=10&search=laptop
```

**Respuesta exitosa `200`:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Laptop Gamer",
      "description": "Laptop de alto rendimiento",
      "price": "1299.99",
      "stock": 15,
      "image_url": "https://picsum.photos/seed/1234/640/480",
      "created_at": "2024-02-10T12:00:00.000Z",
      "updated_at": "2024-02-10T12:00:00.000Z"
    }
  ],
  "pagination": {
    "total": 1,
    "page": 1,
    "limit": 10,
    "totalPages": 1
  }
}
```

---

### `GET /api/products/:id`

Obtiene un producto específico por su ID.

**Params:**

| Parámetro | Tipo   | Descripción     |
|-----------|--------|-----------------|
| `id`      | number | ID del producto |

**Ejemplo de request:**
```
GET /api/products/1
```

**Respuesta exitosa `200`:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "Laptop Gamer",
    "description": "Laptop de alto rendimiento",
    "price": "1299.99",
    "stock": 15,
    "image_url": "https://picsum.photos/seed/1234/640/480",
    "created_at": "2024-02-10T12:00:00.000Z",
    "updated_at": "2024-02-10T12:00:00.000Z"
  }
}
```

**Respuesta error `404`:**
```json
{
  "success": false,
  "message": "Producto con ID 99 no encontrado"
}
```

---

### `POST /api/products`

Crea un nuevo producto. **La imagen se obtiene automáticamente de Lorem Picsum** si no se proporciona `image_url`.

**Headers:**
```
Content-Type: application/json
```

**Body (JSON):**

| Campo         | Tipo    | Requerido | Descripción                            |
|---------------|---------|-----------|----------------------------------------|
| `name`        | string  | ✅        | Nombre del producto (2-255 chars)      |
| `description` | string  | ❌        | Descripción (máx 2000 chars)           |
| `price`       | number  | ✅        | Precio positivo (ej: 99.99)            |
| `stock`       | number  | ✅        | Stock entero ≥ 0                       |
| `image_url`   | string  | ❌        | URL de imagen (si no, se auto-obtiene) |

**Ejemplo de request:**
```json
{
  "name": "Mouse Inalámbrico",
  "description": "Mouse ergonómico con batería recargable",
  "price": 29.99,
  "stock": 50
}
```

**Respuesta exitosa `201`:**
```json
{
  "success": true,
  "message": "Producto creado exitosamente",
  "data": {
    "id": 2,
    "name": "Mouse Inalámbrico",
    "description": "Mouse ergonómico con batería recargable",
    "price": "29.99",
    "stock": 50,
    "image_url": "https://fastly.picsum.photos/id/237/640/480.jpg",
    "created_at": "2024-02-10T12:05:00.000Z",
    "updated_at": "2024-02-10T12:05:00.000Z"
  }
}
```

**Respuesta error de validación `400`:**
```json
{
  "success": false,
  "message": "Error de validación",
  "errors": [
    "El nombre es obligatorio",
    "El precio debe ser mayor a 0"
  ]
}
```

---

### `PUT /api/products/:id`

Actualiza uno o varios campos de un producto existente.

**Headers:**
```
Content-Type: application/json
```

**Params:**

| Parámetro | Tipo   | Descripción     |
|-----------|--------|-----------------|
| `id`      | number | ID del producto |

**Body (JSON) — todos los campos son opcionales, mínimo 1:**

```json
{
  "price": 24.99,
  "stock": 45
}
```

**Respuesta exitosa `200`:**
```json
{
  "success": true,
  "message": "Producto actualizado exitosamente",
  "data": {
    "id": 2,
    "name": "Mouse Inalámbrico",
    "description": "Mouse ergonómico con batería recargable",
    "price": "24.99",
    "stock": 45,
    "image_url": "https://fastly.picsum.photos/id/237/640/480.jpg",
    "created_at": "2024-02-10T12:05:00.000Z",
    "updated_at": "2024-02-10T13:00:00.000Z"
  }
}
```

---

### `DELETE /api/products/:id`

Elimina un producto por su ID.

**Params:**

| Parámetro | Tipo   | Descripción     |
|-----------|--------|-----------------|
| `id`      | number | ID del producto |

**Ejemplo de request:**
```
DELETE /api/products/2
```

**Respuesta exitosa `200`:**
```json
{
  "success": true,
  "message": "Producto con ID 2 eliminado exitosamente",
  "data": {
    "id": 2,
    "name": "Mouse Inalámbrico",
    ...
  }
}
```

---

### `GET /api/health`

Verifica el estado del servidor y la conexión a la base de datos.

**Respuesta exitosa `200`:**
```json
{
  "success": true,
  "status": "healthy",
  "database": "connected",
  "timestamp": "2024-02-10T12:00:00.000Z"
}
```

---

## ⚠️ Códigos de Error

| Código | Significado                                  |
|--------|----------------------------------------------|
| `400`  | Bad Request — datos inválidos o faltantes    |
| `404`  | Not Found — recurso no encontrado            |
| `500`  | Internal Server Error — error del servidor   |
| `503`  | Service Unavailable — DB desconectada        |
