const db = require("../models");

/*let loan = {
    requestedDate: "2019-05-20",
    requestedTimeInit: "10:00",
    requestedTimeEnd: "12:00",
    status: "REQUEST_PENDING",
    student_id: 1,
    laboratory_id: 1,
    materials: [1,2,3,3]
}

db.loans.create(loan).then(loan_instance => {
//    console.log(loan);
//    console.log('instance', loan_instance);
   /* loan_instance.setMaterials(loan.materials).then(
        result => {
            console.log('result', result);
        }).catch(error => {
;        console.error(error);
    });
	var loan_materials = [];
 	loan.materials.forEach(material => {
		const m = { loan_id:loan_instance.id, material_id: material};
		loan_materials.push(m);
	});
	console.log('lm', loan_materials);
	db.loan_materials.bulkCreate(loan_materials).then(() => {
console.log('ok');
}).catch(error => {
    console.error(error);
});
}).catch(error => {
    console.error(error);
})*/

/*
db.loans.create(
	{
		requestedDate: "2019-05-20",
		requestedTimeInit: "10:00",
		requestedTimeEnd: "12:00",
		status: "REQUESTED_PENDING",
		student_id: 1,
		laboratory_id: 1,
	}
).then(loan => {
	console.log(loan);
	let loan_materials = [
		{
			id: 1
		},
		{
			id: 2
		},
		{
			id: 3
		}
	];
	db.materials.findAll(
		{
			where: {
				[db.Sequelize.Op.or]: loan_materials
			}
		}
	).then(materials => {
		loan.addMaterials(materials);
	})
}).catch(error => {
	console.error(error);
})*/

db.loans.findAll({
    raw: true,
    include: [
        {
            model: db.loan_materials,
            as: "materials",
            attributes: ['id'],
            include: [{
                model: db.materials,
                as: 'material'
            }, {
                model: db.inventory,
                as: 'inventory'
            }]
		}
	],
    where: {
        id: 11
    }
}).then(loans => {
    console.log(loans)
})
