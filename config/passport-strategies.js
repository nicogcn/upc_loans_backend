const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const bcrypt = require('bcrypt');

const UserOperations = require('../operations/user-operations');
const userOperations = new UserOperations();

const localOptions = {
    usernameField: 'email'
};

const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_KEY
};

module.exports = {
  localLogin: new LocalStrategy(localOptions, function(email, password, done){
    userOperations.getUserByEmail(email, (user, error) => {
      if (user) {
        bcrypt.compare(password, user.password, (err, res) => {
          if (res) {
            return done(null, user);
          } else {
            return done('wrong password', false);
          }
        });
      } else {
        return done('User not found', false);
      }
    })
  }),
  jwt: new JwtStrategy(jwtOptions, function (payload, done) {
    console.log(payload);
    done(null, payload);
})
}
