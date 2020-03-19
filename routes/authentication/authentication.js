const express = require('express');
const validator = require('./authentication_schema');
const AuthenticationController = require('../../controllers/authentication_controller');
const controller = new AuthenticationController()
const router = express.Router();

router.post('/signup', (req, res, next) => {
  const {
    value,
    error
  } = validator.registerUser.validate(req.body);
  if (error) {
    res.status(400).send(error.message);
  } else {
    controller.registerUser(value, (user, error) => {
      if (error) {
        console.error(error);
        res.status(500).send(typeof error == 'string' ? error : 'error');
      } else {
        res.json(user);
      }
    })
  }
});

router.post('/signupAdmin', (req, res, next) => {
  const {
    value,
    error
  } = validator.registerUser.validate(req.body);
  if (error) {
    res.status(400).send(error.message);
  } else {
    controller.registerAdministrativeUser(value, (user, error) => {
      if (error) {
        console.error(error);
        res.status(500).send(typeof error == 'string' ? error : 'error');
      } else {
        res.json(user);
      }
    })
  }
});

router.post('/signupManager', (req, res, next) => {
  const {
    value,
    error
  } = validator.registerUser.validate(req.body);
  if (error) {
    res.status(400).send(error.message);
  } else {
    controller.registerManagerUser(value, (user, error) => {
      if (error) {
        console.error(error);
        res.status(500).send(typeof error == 'string' ? error : 'error');
      } else {
        res.json(user);
      }
    })
  }
});

router.put('/activate/:id', (req, res, next) => {
  const {
    value,
    error
  } = validator.activate.validate(req.body);
  if (error) {
    res.status(400).send(error.message);
  } else {
    controller.activateUser(req.params.id, value.rfid, (result, error) => {
      if (error) {
        res.status(500).send(typeof error == 'string' ? error : 'error');
      } else {
        if (result[0] == 1) {
          res.json('OK!');
        } else {
          res.status(500).send('activate user failed');
        }
      }
    });
  }
});

router.post('/login', (req, res, next) => {
  console.log('post login', req.body);
  const {
    value,
    error
  } = validator.login.validate(req.body);
  if (error) {
    console.error(error);
    res.status(400).send(error.message);
  } else {
    controller.login(value, (user, error) => {
      if (error) {
        console.error(error);
        res.status(401).send(typeof error == 'string' ? error : 'error');
      } else {
        res.json(user);
      }
    })
  }
});

router.post('/rfid', (req, res, next) => {
  const {
    value,
    error
  } = validator.activate.validate(req.body);
  if (error) {
    res.status(400).send(error.message);
  } else {
    controller.RFIDAuthenticate(value.rfid, (user, error) => {
      if (error) {
        console.error(error);
        res.status(500).send(typeof error == 'string' ? error : 'error');
      } else {
        res.json(user);
      }
    })
  }
});

module.exports = router;
