const db = require("../models");

db.sequelize.drop().then(() => {
	console.log("All is ok");
	process.exit(0);
});
