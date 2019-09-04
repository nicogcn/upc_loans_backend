const db = require("../models");

/**
 * -------------     USER TYPES  --------------
 */
let user_types = [
	{
		type: "ADMIN"
	},
	{
		type: "COORDINATOR"
	},
	{
		type: "STUDENT"
	},
	{
		type: "MANAGER"
	},
	{
		type: "TEACHER"
	}
];

async function insertUserType(userType){
	await db.user_types.create(userType);
}

for(let i = 0; i < user_types.length; i++){
	insertUserType(user_types[i]);
}

/**
 * -------------     USERS    --------------
 */

/*db.user_types.findOne({
	where: {
		type: "TEACHER"
	}
}).then(function(teacherType){
	db.users.create({
		name: "Luis Felipe Herrera",
		email: "luis_felipe@upc.edu.co",
		rfid: null,
		password: "CISF",
		is_active: true,
		user_type: teacherType.id
	}).then(user => {
		console.log(user)
	}).catch(error => {
		console.error(error);
	})
})*/

/**
 * --------    LABORATORIES   -----------
 */

let laboratories = [
	{
		name: "Radiocomunicaciones"
	}
];

async function insertLaboratories(laboratory){
	await db.laboratories.create(laboratory);
}


for(let i = 0; i < laboratories.length; i++){
	insertLaboratories(laboratories[i]);
}

/**
 * --------    LESSONS   -----------
 */

let schedules = [
	{
		dayOfWeek: 1,
		timeInit: "10:00",
		timeEnd: "12:00"
	},
	{
		dayOfWeek: 3,
		timeInit: "14:00",
		timeEnd: "16:00"
	}
];

let lessons = [
	{

	}
]

//insertUserType(userStudent);

/*
db.user_types.findOne({
	where: {
		type: "STUDENT"
	}
}).then(function(studentType){
	db.users.create({
		name: "Nicolás",
		email: "abc@upc.edu.co",
		rfid: null,
		password: "CISF",
		is_active: false,
		user_type: studentType.id
	}).then(user => {
		console.log(user)
	}).catch(error => {
		console.error(error);
	})
})
*/

//process.exit(0);


