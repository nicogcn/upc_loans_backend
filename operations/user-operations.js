const db = require("../models");
const bcrypt = require('bcrypt');

module.exports = class UserOperations {

  constructor() {}

  getUserByEmail(email, callback){
    db.users.findOne({
        where: {
          email: email
        },
        attributes: ['id','password','name','email','is_active'],
        include: [{
            model: db.user_types,
            as: 'type',
            attributes: ['type']
          }
        ]
      })
    .then(user => {
      if (user){
        callback(user, null);
      } else {
        callback(null, 'User not found');
      }
    })
    .catch(error => callback(null, error))
  }
}
