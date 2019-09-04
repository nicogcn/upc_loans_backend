/*const db = require("../models");

db.sequelize.drop().then(() => {
	console.log("All is ok");
	process.exit(0);
});
*/
const db = require("../models");
const con = require('../controllers/laboratories_controller');
//con.getLaboratories();
var cont = new con();
lb = cont.getLaboratories((laboratories, error) => {
	console.log('callback',laboratories);
});
console.log('co',lb);
