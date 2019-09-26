"use strict";
const db = require("../models");

module.exports = class LoansCotroller {


    constructor() {}

    requestLoan(loan, callback) {
        db.loans.create(loan).then(loan_instance => {
            var loan_materials = [];
            loan.materials.forEach(material => {
                const m = {
                    loan_id: loan_instance.id,
                    material_id: material
                };
                loan_materials.push(m);
            });
            db.loan_materials.bulkCreate(loan_materials).then(() => {
                callback(loan, null);
            }).catch(error => {
                callback(null, error);
            });
        }).catch(error => {
            callback(null, error);
        })
    }

    getStudentLoansHistory(student_id, callback) {
        db.loans.findAll({
            include: [{
                model: db.loan_materials,
                as: "materials",
                attributes: ['id'],
                include: [{
                        model: db.materials,
                        as: 'material',
                        attributes: ['id', 'name', 'mark']
                    },
                    {
                        model: db.inventory,
                        as: 'inventory',
                        attributes: ['id', 'number']
                }]
		      }],
            where: {
                student_id: student_id
            }
        }).then(loans => {
            callback(loans, null);
        }).catch(error => {
            callback(null, error);
        })
    }

    getPendingLoans(callback) {
        db.loans.findAll({
            include: [{
                model: db.loan_materials,
                as: "materials",
                attributes: ['id'],
                include: [{
                        model: db.materials,
                        as: 'material',
                        attributes: ['id', 'name', 'mark']
                    },
                    {
                        model: db.inventory,
                        as: 'inventory',
                        attributes: ['id', 'number']
                }]
		      }],
            where: {
                status: 'REQUEST_PENDING'
            }
        }).then(loans => {
            callback(loans, null);
        }).catch(error => {
            callback(null, error);
        })
    }

    getManagedLoans(manager_id, callback) {
        db.loans.findAll({
            include: [{
                model: db.loan_materials,
                as: "materials",
                attributes: ['id'],
                include: [{
                        model: db.materials,
                        as: 'material',
                        attributes: ['id', 'name', 'mark']
                    },
                    {
                        model: db.inventory,
                        as: 'inventory',
                        attributes: ['id', 'number']
                }]
		      }],
            where: {
                manager_id: manager_id
            }
        }).then(loans => {
            callback(loans, null);
        }).catch(error => {
            callback(null, error);
        })
    }

    getLoanStatus(loan_id) {
        return db.loans.findOne({
            raw: true,
            attributes: ['status'],
            where: {
                id: loan_id
            }
        }).then(status => {
            return status ? status.status : null
        });
    }

    cancelLoan(loan_id, callback) {
        this.getLoanStatus(loan_id)
            .then(status => {
                if (status) {
                    if (status != 'FINISHED' && status != 'IN_USE') {
                        db.loans.update({
                                status: 'REQUEST_CANCELED'
                            }, {
                                where: {
                                    id: loan_id
                                }
                            }).then(loan => callback(loan, null))
                            .catch(error => callback(null, error));
                    } else {
                        callback(null, 'loan cannot be cancelled');
                    }
                } else {
                    callback(null, 'loan not found');
                }
            })
            .catch(error => callback(null, error));
    }

    setInventoryItemForLoanMaterial(item_id, loan_material_id, callback) {
        db.loan_materials.update({
                inventory_id: item_id
            }, {
                where: {
                    id: loan_material_id
                }
            }).then(loan_material => callback(loan_material, null))
            .catch(error => callback(null, error));
    }

    approveLoan(loan_id, callback) {
        this.getLoanStatus(loan_id)
            .then(status => {
                if (status) {
                    if (status == 'REQUEST_PENDING') {
                        db.loan_materials.findAll({
                                where: {
                                    loan_id: loan_id,
                                    inventory_id: null
                                }
                            })
                            .then(materials => {
                                console.log(materials);
                                if (materials.length) {
                                    callback(null, 'All the materials in loan need to be associated with item in inventory');
                                } else {
                                    db.loans.update({
                                            status: 'REQUEST_APPROVED'
                                        }, {
                                            where: {
                                                id: loan_id
                                            }
                                        }).then(loan => callback(loan, null))
                                        .catch(error => callback(null, error));
                                }
                            })
                            .catch(error => callback(null, error))
                    } else {
                        callback(null, 'loan is not pending');
                    }
                } else {
                    callback(null, 'loan not found');
                }
            })
            .catch(error => callback(null, error));
    }

    rejectLoan(loan_id, callback) {
        this.getLoanStatus(loan_id)
            .then(status => {
                if (status) {
                    if (status == 'REQUEST_PENDING') {
                        db.loans.update({
                                status: 'REQUEST_REJECTED'
                            }, {
                                where: {
                                    id: loan_id
                                }
                            }).then(loan => callback(loan, null))
                            .catch(error => callback(null, error));
                    } else {
                        callback(null, 'loan cannot be rejected');
                    }
                } else {
                    callback(null, 'loan not found');
                }
            })
            .catch(error => callback(null, error));
    }

    doLoan(loan_id, callback) {
        this.getLoanStatus(loan_id)
            .then(status => {
                if (status) {
                    if (status == 'REQUEST_APPROVED') {
                        db.loans.update({
                                status: 'IN_USE',
                                loanTimeInit: db.sequelize.fn('NOW')
                            }, {
                                where: {
                                    id: loan_id
                                }
                            }).then(loan => callback(loan, null))
                            .catch(error => callback(null, error));
                    } else {
                        callback(null, 'loan not approved');
                    }
                } else {
                    callback(null, 'loan not found');
                }
            })
            .catch(error => callback(null, error));
    }

    finishLoan(loan_id, callback) {
        this.getLoanStatus(loan_id)
            .then(status => {
                if (status) {
                    if (status == 'IN_USE') {
                        db.loans.update({
                                status: 'FINISHED',
                                loanTimeEnd: db.sequelize.fn('NOW')
                            }, {
                                where: {
                                    id: loan_id
                                }
                            }).then(loan => callback(loan, null))
                            .catch(error => callback(null, error));
                    } else {
                        callback(null, 'loan not initiated');
                    }
                } else {
                    callback(null, 'loan not found');
                }
            })
            .catch(error => callback(null, error));
    }

}
