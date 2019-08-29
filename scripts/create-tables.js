const db = require("../models");

db.sequelize.sync().then(() => {
	console.log("Database schema created successfully");
	process.exit(0);
});
