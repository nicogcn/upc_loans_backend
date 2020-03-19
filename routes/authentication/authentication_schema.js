const Joi = require('@hapi/joi');
module.exports = {
  id: Joi.number().integer().min(1).label('id').required(),
  registerUser: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required()
  }),
  activate: Joi.object().keys({
    rfid: Joi.string().required()
  }),
  login: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required()
  })
}
