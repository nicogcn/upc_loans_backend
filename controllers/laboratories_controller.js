"use strict";
const db = require("../models");
module.exports = class LaboratoriesController {

  constructor() {}

  getLaboratories(callback) {
    db.laboratories.findAll({
      raw: true
    }).then(function(laboratories) {
      callback(laboratories, null);
    });
  };
}
