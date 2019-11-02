const express = require('express');
const validator = require('./laboratoriesSchema');
const laboratoriesCotroller = require('../../controllers/laboratories_controller');
var controller = new laboratoriesCotroller()
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
