const express = require('express');
const router = express.Router();
const passport = require('passport');

const authenticationController = require('../controllers/authentication-controller');

const localLogin = (req, res, next) => {
  passport.authenticate('local', function(err, user, info){
    if(err){
      return next({code:401, message: err});
    } else {
      req.user = user;
      return next();
    }
  })(req, res, next);
}

router.post('/login', localLogin, authenticationController.doLogin);

module.exports = router;
