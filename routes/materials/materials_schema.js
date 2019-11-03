const Joi = require('@hapi/joi');
module.exports = {
  id: Joi.number().integer().min(1).label('id'),
  newMaterial: Joi.object().keys({
    name: Joi.string().required().max(75),
    mark: Joi.string().required().max(30),
    laboratory_id: Joi.number().integer().min(1).required(),
    inventories: Joi.array().items(Joi.object().keys({
      plaque: Joi.string().max(12).required(),
      purchase: Joi.date().required(),
      number: Joi.number().integer().min(1).required()
    }).required()).min(1).required()
  }).required(),
  updateMaterial: Joi.object().keys({
    name: Joi.string().max(75),
    mark: Joi.string().max(30),
    laboratory_id: Joi.number().integer().min(1)
  }).required(),
  newInventoryItem: Joi.object().keys({
    material_id: Joi.number().integer().min(1).required(),
    plaque: Joi.string().max(12).required(),
    purchase: Joi.date().required(),
    number: Joi.number().integer().min(1).required()
  }).required()
}
