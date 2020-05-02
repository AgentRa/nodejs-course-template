const Joi = require('joi');
const UUID_VERSION = 'uuidv4';

const schemas = {
  taskId: {
    id: Joi.string()
      .guid({ version: UUID_VERSION })
      .required(),
    boardId: Joi.string()
      .guid({ version: UUID_VERSION })
      .required()
  },
  id: {
    id: Joi.string()
      .guid({ version: UUID_VERSION })
      .required()
  },
  user: Joi.object()
    .options({ abortEarly: false, allowUnknown: true })
    .keys({
      name: Joi.string()
        .min(3)
        .max(30)
        .required(),
      login: Joi.string()
        .min(4)
        .max(20)
        .required(),
      password: Joi.string().regex(/^(?=.*\d).{3,30}$/)
    })
};

module.exports = schemas;
