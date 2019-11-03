const express = require('express');
const validator = require('./laboratories_schema');
const laboratoriesController = require('../../controllers/laboratories_controller');
var controller = new laboratoriesController()
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
