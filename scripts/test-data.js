const db = require("./models");

db.user_types.findOne({
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
		console.log(user);
		db.laboratories.findOne({
			where: {
				name: "Radiocomunicaciones"
			}
		}).then(laboratory => {
			db.lessons.create(
				{
					group: 1,
					name: "IoT",
					teacher_id: user.id,
					laboratory_id: laboratory.id,
					schedules: [
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
					]
				}, {
					include: [db.schedules]
				}
			).then(lesson => {
				console.log(lesson);
			}).catch(error => {
				console.error(error);
			})
		}).catch(error => {
			console.error(error);
		})
	}).catch(error => {
		console.error(error);
	})
});


db.laboratories.findOne({
	where: {
		name: "Radiocomunicaciones"
	}
}).then(laboratory => {
	let materials = [
		{
			name: "Analizador de Espectro HSA9103B",
			mark: "AEROFLEX",
			laboratory_id: laboratory.id,
			inventories: [
				{
					plaque: "40009",
					purchase: "2010-01-01"
				},
				{
					plaque: "40010",
					purchase: "2010-01-01"
				},
				{
					plaque: "40011",
					purchase: "2010-01-01"
				},
				{
					plaque: "40012",
					purchase: "2010-01-01"
				}
			]
		},
		{
			name: "Analizador de Espectro HM5530",
			mark: "HAMEG",
			laboratory_id: laboratory.id,
			inventories: [
				{
					plaque: "39082",
					purchase: "2012-01-01"
				}
			]
		},
		{
			name: "Entrenador de Telefonia Celular",
			mark: "ELECTRÓNICA VENETA",
			laboratory_id: laboratory.id,
			inventories: [
				{
					plaque: "29575",
					purchase: "2003-01-01"
				}
			]
		},
		{
			name: "Tarjeta Altium",
			mark: "Nanoboard 3000",
			laboratory_id: laboratory.id,
			inventories: [
				{
					plaque: "400017",
					purchase: "2010-01-01"
				},
				{
					plaque: "400018",
					purchase: "2010-01-01"
				},
				{
					plaque: "400019",
					purchase: "2010-01-01"
				},
				{
					plaque: "400023",
					purchase: "2010-01-01"
				},
				{
					plaque: "400024",
					purchase: "2010-01-01"
				},
				{
					plaque: "400025",
					purchase: "2010-01-01"
				},
				{
					plaque: "400026",
					purchase: "2010-01-01"
				},
				{
					plaque: "400027",
					purchase: "2010-01-01"
				},
				{
					plaque: "400028",
					purchase: "2010-01-01"
				},
				{
					plaque: "400029",
					purchase: "2010-01-01"
				},
			]
		},
		{
			name: "Entrenador GSM-GPS DGS100",
			mark: "K&H",
			laboratory_id: laboratory.id,
			inventories: [
				{
					plaque: "44171",
					purchase: "2012-01-01"
				},
				{
					plaque: "44172",
					purchase: "2012-01-01"
				},
				{
					plaque: "44173",
					purchase: "2012-01-01"
				},
				{
					plaque: "44174",
					purchase: "2012-01-01"
				}
			]
		},
		{
			name: "Televisor Tc- L3251X",
			mark: "PANASONIC",
			laboratory_id: laboratory.id,
			inventories: [
				{
					plaque: "29577",
					purchase: "2003-01-01"
				}
			]
		},
		{
			name: "DRONE",
			mark: "PARROT / BEBOP2",
			laboratory_id: laboratory.id,
			inventories: [
				{
					plaque: "33173",
					purchase: "2017-01-01"
				}
			]
		},
		{
			name: "Power Beam AC",
			mark: "UBIQUITI / PBE-5AC-500",
			laboratory_id: laboratory.id,
			inventories: [
				{
					plaque: "33169",
					purchase: "2017-01-01"
				},
				{
					plaque: "33170",
					purchase: "2017-01-01"
				},
				{
					plaque: "33171",
					purchase: "2017-01-01"
				},
				{
					plaque: "33172",
					purchase: "2017-01-01"
				}
			]
		},
		{
			name: "Raspberry PI 3 + Caja para raspberry",
			mark: null,
			laboratory_id: laboratory.id,
			inventories: [
				{
					plaque: null,
					purchase: "2015-01-01"
				},
				{
					plaque: null,
					purchase: "2015-01-01"
				},
				{
					plaque: null,
					purchase: "2015-01-01"
				},
				{
					plaque: null,
					purchase: "2015-01-01"
				},
				{
					plaque: null,
					purchase: "2015-01-01"
				},
				{
					plaque: null,
					purchase: "2015-01-01"
				}
			]
		},
		{
			name: "Memoria micro SD con adaptador",
			mark: null,
			laboratory_id: laboratory.id,
			inventories: [
				{
					plaque: null,
					purchase: "2015-01-01"
				},
				{
					plaque: null,
					purchase: "2015-01-01"
				},
				{
					plaque: null,
					purchase: "2015-01-01"
				},
				{
					plaque: null,
					purchase: "2015-01-01"
				},
				{
					plaque: null,
					purchase: "2015-01-01"
				},
				{
					plaque: null,
					purchase: "2015-01-01"
				},
				{
					plaque: null,
					purchase: "2015-01-01"
				},
				{
					plaque: null,
					purchase: "2015-01-01"
				},
				{
					plaque: null,
					purchase: "2015-01-01"
				},
				{
					plaque: null,
					purchase: "2015-01-01"
				}
			]
		},
		{
			name: "Kit de Raspberry PI 3",
			mark: null,
			laboratory_id: laboratory.id,
			inventories: [
				{
					plaque: null,
					purchase: "2017-01-01"
				},
				{
					plaque: null,
					purchase: "2017-01-01"
				},
				{
					plaque: null,
					purchase: "2017-01-01"
				},
				{
					plaque: null,
					purchase: "2017-01-01"
				},
				{
					plaque: null,
					purchase: "2017-01-01"
				},
				{
					plaque: null,
					purchase: "2017-01-01"
				}
			]
		},
		{
			name: "Canakit Raspberry PI 3",
			mark: "Canakit",
			laboratory_id: laboratory.id,
			inventories: [
				{
					plaque: null,
					purchase: "2017-01-01"
				},
				{
					plaque: null,
					purchase: "2017-01-01"
				},
				{
					plaque: null,
					purchase: "2017-01-01"
				},
				{
					plaque: null,
					purchase: "2017-01-01"
				},
				{
					plaque: null,
					purchase: "2017-01-01"
				},
				{
					plaque: null,
					purchase: "2017-01-01"
				},
				{
					plaque: null,
					purchase: "2017-01-01"
				},
				{
					plaque: null,
					purchase: "2017-01-01"
				},
				{
					plaque: null,
					purchase: "2017-01-01"
				},
				{
					plaque: null,
					purchase: "2017-01-01"
				},
				{
					plaque: null,
					purchase: "2017-01-01"
				},
				{
					plaque: null,
					purchase: "2017-01-01"
				},
				{
					plaque: null,
					purchase: "2017-01-01"
				},
				{
					plaque: null,
					purchase: "2017-01-01"
				},
				{
					plaque: null,
					purchase: "2017-01-01"
				},
				{
					plaque: null,
					purchase: "2017-01-01"
				},
				{
					plaque: null,
					purchase: "2017-01-01"
				},
				{
					plaque: null,
					purchase: "2017-01-01"
				},
				{
					plaque: null,
					purchase: "2017-01-01"
				}
			]
		},
		{
			name: "Programador para microprocesador",
			mark: "Pickit 3",
			laboratory_id: laboratory.id,
			inventories: [
				{
					plaque: null,
					purchase: "2017-01-01"
				},
				{
					plaque: null,
					purchase: "2017-01-01"
				},
				{
					plaque: null,
					purchase: "2017-01-01"
				},
				{
					plaque: null,
					purchase: "2017-01-01"
				},
				{
					plaque: null,
					purchase: "2017-01-01"
				}
			]
		},
		{
			name: "Cámara Raspberri PI 3",
			mark: null,
			laboratory_id: laboratory.id,
			inventories: [
				{
					plaque: null,
					purchase: "2017-01-01"
				},
				{
					plaque: null,
					purchase: "2017-01-01"
				},
				{
					plaque: null,
					purchase: "2017-01-01"
				},
				{
					plaque: null,
					purchase: "2017-01-01"
				},
				{
					plaque: null,
					purchase: "2017-01-01"
				},
				{
					plaque: null,
					purchase: "2017-01-01"
				}
			]
		},
		{
			name: "Kit de sensores (37 sensores)",
			mark: null,
			laboratory_id: laboratory.id,
			inventories: [
				{
					plaque: null,
					purchase: "2017-01-01"
				},
				{
					plaque: null,
					purchase: "2017-01-01"
				},
				{
					plaque: null,
					purchase: "2017-01-01"
				},
				{
					plaque: null,
					purchase: "2017-01-01"
				}
			]
		},
		{
			name: "Kit Xbee Digi",
			mark: null,
			laboratory_id: laboratory.id,
			inventories: [
				{
					plaque: null,
					purchase: "2017-01-01"
				},
				{
					plaque: null,
					purchase: "2017-01-01"
				},
				{
					plaque: null,
					purchase: "2017-01-01"
				},
				{
					plaque: null,
					purchase: "2017-01-01"
				},
				{
					plaque: null,
					purchase: "2017-01-01"
				},
				{
					plaque: null,
					purchase: "2017-01-01"
				}
			]
		},
		{
			name: "Late Panda",
			mark: null,
			laboratory_id: laboratory.id,
			inventories: [
				{
					plaque: null,
					purchase: "2017-01-01"
				},
				{
					plaque: null,
					purchase: "2017-01-01"
				}
			]
		},
		{
			name: "Módulo GSM Adafruit",
			mark: null,
			laboratory_id: laboratory.id,
			inventories: [
				{
					plaque: null,
					purchase: "2017-01-01"
				},
				{
					plaque: null,
					purchase: "2017-01-01"
				},
				{
					plaque: null,
					purchase: "2017-01-01"
				},
				{
					plaque: null,
					purchase: "2017-01-01"
				}
			]
		},
		{
			name: "Antena Módulo GSM 3db",
			mark: null,
			laboratory_id: laboratory.id,
			inventories: [
				{
					plaque: null,
					purchase: "2017-01-01"
				},
				{
					plaque: null,
					purchase: "2017-01-01"
				},
				{
					plaque: null,
					purchase: "2017-01-01"
				}
			]
		},
		{
			name: "Bateria Módulo GSM",
			mark: null,
			laboratory_id: laboratory.id,
			inventories: [
				{
					plaque: null,
					purchase: "2017-01-01"
				},
				{
					plaque: null,
					purchase: "2017-01-01"
				},
				{
					plaque: null,
					purchase: "2017-01-01"
				}
			]
		},
		{
			name: "Pantallas LCD para Raspberry",
			mark: "Adafruit",
			laboratory_id: laboratory.id,
			inventories: [
				{
					plaque: null,
					purchase: "2017-01-01"
				},
				{
					plaque: null,
					purchase: "2017-01-01"
				}
			]
		},
		{
			name: "Módulos SIGFOX para Arduino",
			mark: null,
			laboratory_id: laboratory.id,
			inventories: [
				{
					plaque: null,
					purchase: "2017-01-01"
				},
				{
					plaque: null,
					purchase: "2017-01-01"
				},
				{
					plaque: null,
					purchase: "2017-01-01"
				},
				{
					plaque: null,
					purchase: "2017-01-01"
				},
				{
					plaque: null,
					purchase: "2017-01-01"
				}
			]
		},
		{
			name: "Multimetro",
			mark: "UNI-T",
			laboratory_id: laboratory.id,
			inventories: [
				{
					plaque: "29536",
					purchase: "2013-01-01"
				},
				{
					plaque: "29537",
					purchase: "2013-01-01"
				},
				{
					plaque: "29538",
					purchase: "2013-01-01"
				},
				{
					plaque: "29539",
					purchase: "2013-01-01"
				},
				{
					plaque: "29540",
					purchase: "2013-01-01"
				},
				{
					plaque: "29545",
					purchase: "2013-01-01"
				}
			]
		},
		{
			name: "Multimetro VIEW110",
			mark: "EXTECH",
			laboratory_id: laboratory.id,
			inventories: [
				{
					plaque: "11331",
					purchase: "2005-01-01"
				},
				{
					plaque: "11660",
					purchase: "2005-01-01"
				},
				{
					plaque: "11664",
					purchase: "2005-01-01"
				}
			]
		}
	];
	for(let i = 0; i < materials.length; i++){
		for(let j = 0; j < materials[i].inventories.length; j++){
			materials[i].inventories[j].number = j + 1;
		}
		db.materials.create(materials[i], {
			include: [db.inventory]
		}).then(material =>{
			console.log("Material " + material.id + " created successfully");
		}).catch(error => {
			console.error(error);
		})
	}
}).catch(error => {
	console.error(error);
})