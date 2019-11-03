const express = require('express');
const validator = require('./laboratories_schema');
const LaboratoriesController = require('../../controllers/laboratories_controller');
const controller = new LaboratoriesController()
const router = express.Router();

router.get('/', (req, res, next) => {
  controller.getLaboratories((laboratories, error) => {
    if (error) {
      res.status(500).send('error');
    } else {
      res.json(laboratories);
    }
  });
});

module.exports = router;
