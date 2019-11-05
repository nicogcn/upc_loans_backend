const Joi = require('@hapi/joi').extend(require('@hapi/joi-date'));
module.exports = {
  id: Joi.number().integer().min(1).label('id').required(),
  requestLoan: Joi.object().keys({
    student_id: Joi.number().integer().min(1).required(),
    laboratory_id: Joi.number().integer().min(1).required(),
    materials: Joi.array().items(Joi.number().integer().min(1).label('material_id').required()).min(1).required(),
    requested_date: Joi.date().format(['DD/MM/YYYY', 'YYYY/MM/DD']).required(),
    requested_time_init: Joi.date().format('HH:mm').required().raw(),
    requested_time_end: Joi.date().format('HH:mm').required().raw()
  }).required(),
  setLoanItem: Joi.object().keys({
    item_id: Joi.number().integer().min(1).required(),
    loan_material_id: Joi.number().integer().min(1).required()
  }).required()
}
