module.exports = function(sequelize, DataTypes){
	const LoansMaterials = sequelize.define('loans_materials', {
	}, {
		tableName: 'LOANS_MATERIALS',
		timestamps: false,
		underscored: true
	});

	LoansMaterials.associate = (db) => {
		LoansMaterials.belongsTo(db.inventory, {
			as: "inventory",
			foreignKey: "inventory_id"
		});
	}

	return LoansMaterials
};