const express = require('express');
const validator = require('./loans_schema');
const LoansController = require('../../controllers/loans_controller');
const controller = new LoansController();
const router = express.Router();
const moment = require('moment')

router.post('/', (req, res, next) => {
  const {
    value,
    error
  } = validator.requestLoan.validate(req.body);
  if (error) {
    res.status(400).send(error.message);
  } else {
    controller.requestLoan(value, (loan, error) => {
      if (error) {
        console.error(error);
        res.status(500).send(typeof error == 'string' ? error : 'error');
      } else {
        res.json(loan);
      }
    });
  }
});

router.get('/user_loans/:id', (req, res, next) => {
  console.log('sss');
  var now = Date.now();
  var nowTime = moment(now).format("HH:mm");
  console.log('v', now, nowTime);
  const {
    value,
    error
  } = validator.id.validate(req.params.id);
  if (error) {
    res.status(400).send(error.message);
  } else {
    controller.getStudentLoansHistory(value, (loans, error) => {
      if (error) {
        res.status(500).send('error');
      } else {
        if (loans) {
          res.json(loans);
        } else {
          res.status(500).send('user not found');
        }
      }
    });
  }
});

router.get('/pending_loans/', (req, res, next) => {
  controller.getPendingLoans((loans, error) => {
    if (error) {
      console.error(error);
      res.status(500).send('error');
    } else {
      if (loans) {
        res.json(loans);
      } else {
        res.status(500).send('user not found');
      }
    }
  });
});

router.get('/managed_loans/:id', (req, res, next) => {
  const {
    value,
    error
  } = validator.id.validate(req.params.id);
  if (error) {
    res.status(400).send(error.message);
  } else {
    controller.getManagedLoans(value, (loans, error) => {
      if (error) {
        res.status(500).send('error');
      } else {
        if (loans) {
          res.json(loans);
        } else {
          res.status(500).send('user not found');
        }
      }
    });
  }
});

router.post('/cancel_loan/:id', (req, res, next) => {
  const {
    value,
    error
  } = validator.id.validate(req.params.id);
  if (error) {
    res.status(400).send(error.message);
  } else {
    controller.cancelLoan(value, (result, error) => {
      if (error) {
        res.status(500).send(typeof error == 'string' ? error : 'error');
      } else {
        if (result[0] == 1) {
          res.json('OK!');
        } else {
          res.status(500).send('Cancel loan failed');
        }
      }
    });
  }
});

router.put('/set_loan_item/', (req, res, next) => {
  const {
    value,
    error
  } = validator.setLoanItem.validate(req.body);
  if (error) {
    res.status(400).send(error.message);
  } else {
    controller.setInventoryItemForLoanMaterial(value.item_id, value.loan_material_id, (result, error) => {
      if (error) {
        res.status(500).send(typeof error == 'string' ? error : 'error');
      } else {
        if (result[0] == 1) {
          res.json('OK!');
        } else {
          res.status(500).send('Add item failed');
        }
      }
    });
  }
});

router.post('/approve_loan/:id', (req, res, next) => {
  const {
    value,
    error
  } = validator.id.validate(req.params.id);
  if (error) {
    res.status(400).send(error.message);
  } else {
    controller.approveLoan(value, (result, error) => {
      if (error) {
        res.status(500).send(typeof error == 'string' ? error : 'error');
      } else {
        if (result[0] == 1) {
          res.json('OK!');
        } else {
          res.status(500).send('Approve loan failed');
        }
      }
    });
  }
});

router.post('/reject_loan/:id', (req, res, next) => {
  const {
    value,
    error
  } = validator.id.validate(req.params.id);
  if (error) {
    res.status(400).send(error.message);
  } else {
    controller.rejectLoan(value, (result, error) => {
      if (error) {
        res.status(500).send(typeof error === 'string' ? error : 'error');
      } else {
        if (result[0] == 1) {
          res.json('OK!');
        } else {
          res.status(500).send('Approve loan failed');
        }
      }
    });
  }
});

router.post('/do_loan/:id', (req, res, next) => {
  const {
    value,
    error
  } = validator.id.validate(req.params.id);
  if (error) {
    res.status(400).send(error.message);
  } else {
    controller.doLoan(value, (result, error) => {
      if (error) {
        res.status(500).send(typeof error === 'string' ? error : 'error');
      } else {
        if (result[0] == 1) {
          res.json('OK!');
        } else {
          res.status(500).send('Approve loan failed');
        }
      }
    });
  }
});

router.post('/finish_loan/:id', (req, res, next) => {
  const {
    value,
    error
  } = validator.id.validate(req.params.id);
  if (error) {
    res.status(400).send(error.message);
  } else {
    controller.finishLoan(value, (result, error) => {
      if (error) {
        res.status(500).send(typeof error === 'string' ? error : 'error');
      } else {
        if (result[0] == 1) {
          res.json('OK!');
        } else {
          res.status(500).send('Approve loan failed');
        }
      }
    });
  }
});

module.exports = router;
