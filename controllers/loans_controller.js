"use strict";
const db = require("../models");

module.exports = class LoansCotroller {

    constructor() {}

    requestLoan(loan, callback) {

    }

    updateLoan(loan, callback) {
// .... 
    }
    
    getUserLoansHistory(user_id, callback){
        
    }
    
    getPendingLoans(user_id, callback){
        
    }

    cancelLoan(loan_id, callback) {

    }

    approveLoan(loan_id, callback) {

    }

    rejectLoan(loan_id, callback) {

    }

    doLoan(loan_id, callback) {
        //RFID    
    }

    finishLoan(loan_id, callback) {
        //RFID
    }

}