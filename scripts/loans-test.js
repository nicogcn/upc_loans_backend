const db = require("./models");

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
	include: [
		{
			model: db.materials,
			as: "materials"
		}
	],
	where: {
		id: 4
	}
}).then(loans => {
	console.log(JSON.stringify(loans))
})
