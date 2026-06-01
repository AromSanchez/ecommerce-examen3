const Joi = require("joi");

const createProductSchema = Joi.object({
  name: Joi.string().min(2).max(255).required().messages({
    "string.empty": "El nombre es obligatorio",
    "string.min": "El nombre debe tener al menos 2 caracteres",
    "string.max": "El nombre no puede superar 255 caracteres",
    "any.required": "El nombre es obligatorio",
  }),
  description: Joi.string().max(2000).allow("", null).optional().messages({
    "string.max": "La descripción no puede superar 2000 caracteres",
  }),
  price: Joi.number().positive().precision(2).required().messages({
    "number.base": "El precio debe ser un número",
    "number.positive": "El precio debe ser mayor a 0",
    "any.required": "El precio es obligatorio",
  }),
  stock: Joi.number().integer().min(0).required().messages({
    "number.base": "El stock debe ser un número entero",
    "number.integer": "El stock debe ser un número entero",
    "number.min": "El stock no puede ser negativo",
    "any.required": "El stock es obligatorio",
  }),
  image_url: Joi.string().uri().max(500).allow("", null).optional().messages({
    "string.uri": "La URL de la imagen no es válida",
    "string.max": "La URL no puede superar 500 caracteres",
  }),
});

const updateProductSchema = Joi.object({
  name: Joi.string().min(2).max(255).optional().messages({
    "string.min": "El nombre debe tener al menos 2 caracteres",
    "string.max": "El nombre no puede superar 255 caracteres",
  }),
  description: Joi.string().max(2000).allow("", null).optional().messages({
    "string.max": "La descripción no puede superar 2000 caracteres",
  }),
  price: Joi.number().positive().precision(2).optional().messages({
    "number.base": "El precio debe ser un número",
    "number.positive": "El precio debe ser mayor a 0",
  }),
  stock: Joi.number().integer().min(0).optional().messages({
    "number.base": "El stock debe ser un número entero",
    "number.integer": "El stock debe ser un número entero",
    "number.min": "El stock no puede ser negativo",
  }),
  image_url: Joi.string().uri().max(500).allow("", null).optional().messages({
    "string.uri": "La URL de la imagen no es válida",
  }),
}).min(1).messages({
  "object.min": "Debe enviar al menos un campo para actualizar",
});

const validate = (schema) => (req, res, next) => {
  const { error, value } = schema.validate(req.body, { abortEarly: false });
  if (error) {
    const errors = error.details.map((d) => d.message);
    return res.status(400).json({
      success: false,
      message: "Error de validación",
      errors,
    });
  }
  req.body = value;
  next();
};

module.exports = {
  validateCreate: validate(createProductSchema),
  validateUpdate: validate(updateProductSchema),
};
