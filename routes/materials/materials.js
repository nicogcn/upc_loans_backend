const express = require('express');
const validator = require('./materials_schema');
const MaterialsController = require('../../controllers/materials_controller');
var controller = new MaterialsController()
const router = express.Router();

router.get('/laboratory/:id', (req, res, next) => {
  const {
    value,
    error
  } = validator.id.validate(req.params.id);
  if (error) {
    res.status(400).send(error.message);
  } else {
    controller.getMaterialsFromLaboratory(value, (laboratory, error) => {
      if (error) {
        res.status(500).send('error');
      } else {
        if (laboratory) {
          res.json(laboratory.materials);
        } else {
          res.status(500).send('laboratory not found');
        }
      }
    });
  }
});

router.get('/inventory/:id', (req, res, next) => {
  const {
    value,
    error
  } = validator.id.validate(req.params.id);
  if (error) {
    res.status(400).send(error.message);
  } else {
    controller.getMaterialInventory(value, (material, error) => {
      if (error) {
        res.status(500).send('error');
      } else {
        if (material) {
          res.json(material.inventories);
        } else {
          res.status(500).send('material not found');
        }
      }
    });
  }
});

router.post('/', (req, res, next) => {
  const {
    value,
    error
  } = validator.newMaterial.validate(req.body);
  if (error) {
    res.status(400).send(error.message);
  } else {
    controller.createMaterial(value, (material, error) => {
      if (error) {
        res.status(500).send(typeof error == 'string' ? error : 'error');
      } else {
        res.json(material);
      }
    });
  }
});

router.put('/:id', (req, res, next) => {
  const {
    value,
    error
  } = validator.id.validate(req.params.id);
  id = value;
  if (error) {
    res.status(400).send(error.message);
  } else {
    const {
      value,
      error
    } = validator.updateMaterial.validate(req.body);
    if (error) {
      res.status(400).send(error.message);
    } else {
      controller.updateMaterial(id, value, (result, error) => {
        if (error) {
          res.status(500).send(typeof error == 'string' ? error : 'error');
        } else {
          if (result[0] == 1) {
            res.status(200).send('OK!');
          }else{
            res.status(400).send('material not found');
          }
        }
      });
    }
  }
});

router.delete('/:id', (req, res, next) => {
  const {
    value,
    error
  } = validator.id.validate(req.params.id);
  if (error) {
    res.status(400).send(error.message);
  } else {
    controller.deleteMaterial(value, (result, error) => {
      if (error) {
        res.status(500).send(typeof error == 'string' ? error : 'error');
      } else {
        if (result == 1) {
          res.status(200).send('OK!');
        }else{
          res.status(400).send('material not found');
        }
      }
    });
  }
});

router.post('/inventory', (req, res, next) => {
  const {
    value,
    error
  } = validator.newInventoryItem.validate(req.body);
  if (error) {
    res.status(400).send(error.message);
  } else {
    controller.addItemToMaterialInventory(value, (item, error) => {
      if (error) {
        res.status(500).send(typeof error == 'string' ? error : 'error');
      } else {
        res.json(item);
      }
    });
  }
});

router.delete('/inventory/:id', (req, res, next) => {
  const {
    value,
    error
  } = validator.id.validate(req.params.id);
  if (error) {
    res.status(400).send(error.message);
  } else {
    controller.removeItemFromMaterialInventory(value, (result, error) => {
      if (error) {
        res.status(500).send(typeof error == 'string' ? error : 'error');
      } else {
        if (result == 1) {
          res.status(200).send('OK!');
        }else{
          res.status(400).send('item not found');
        }
      }
    });
  }
});

module.exports = router;
