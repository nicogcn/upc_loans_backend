"use strict";
const db = require("../models");
const bcrypt = require('bcrypt');
module.exports = class AuthenticationController {

  constructor() {}

  registerUser(user, callback) {
    db.user_types.findOne({
      where: {
        type: "STUDENT"
      }
    })
      .then(student => {
        bcrypt.hash(user.password, 10, (err, hash) => {
          user.password = hash;
          user.is_active = false;
          user.user_type = student.id;
          db.users.create(user)
            .then(user => {
              callback(user, null);
            }).catch(error => {
              callback(null, error);
            });
        })
      })
      .catch(error => {
        callback(null, error);
      });
  }

  registerAdministrativeUser(user, callback) {
    db.user_types.findOne({
      where: {
        type: "ADMIN"
      }
    }).then(admin => {
      //const hashedPassword = await bcrypt.hash(user.password, 10);
      //user.password = hashedPassword;
      user.isActive = true;
      user.user_type = admin.id;
      db.users.create(user)
        .then(user => {
          callback(user, null);
        }).catch(error => {
          callback(null, error);
        })
    }).catch(error => {
      callback(null, error);
    })
  }

  registerManagerUser(user, callback) {
    db.user_types.findOne({
      where: {
        type: "MANAGER"
      }
    }).then(manager => {
      //const hashedPassword = await bcrypt.hash(user.password, 10);
      //user.password = hashedPassword;
      user.isActive = true;
      user.user_type = manager.id;
      db.users.create(user)
        .then(user => {
          callback(user, null);
        }).catch(error => {
          callback(null, error);
        })
    }).catch(error => {
      callback(null, error);
    })
  }

  activateUser(user_id, rfid, callback) {
    db.users.update({
      isActive: true,
      rfid: rfid
    }, {
      where: {
        id: user_id
      }
    })
  }

  login(credentials, callback) {
    console.log('login', credentials);
    db.users.findOne({
        where: {
          email: credentials.email
        },
        attributes: ['password','name','email'],
        include: [{
            model: db.user_types,
            as: 'type',
            attributes: ['type']
          }
        ]
      })
      .then(user => {
        if (user) {
          //callback(user, null);
          bcrypt.compare(credentials.password, user.password, (err, res) => {
            if (res) {
              callback({
                name: user.name,
                email: user.email,
                type:user.type.type
              }, null);
            } else {
              callback(null, 'wrong password');
            }
          });
        } else {
          callback(null, 'User not found')
        }
      })
      .catch(error => callback(null, error))
  }

  // RFIDAuthenticate(rfid, callback) {
  //   db.users.findOne({
  //       include: [
  //         model: db.loans,
  //         as: "loans",
  //         where: {
  //           status: 'REQUEST_APPROVED'
  //         }
  //       ],
  //       where: {
  //         rfid: rfid
  //       }
  //     })
  //     .then(user => callback(user, null);)
  //     .catch(error => callback(null, error))
  // }

}
