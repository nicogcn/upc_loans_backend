module.exports = function(sequelize, DataTypes){
	const Inventory = sequelize.define('inventory', {
		id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		plaque: {
			type: DataTypes.STRING(12),
			allowNull: true
		},
		purchase: {
			type: DataTypes.DATEONLY,
			allowNull: false
		},
		number: {
			type: DataTypes.INTEGER(11),
			allowNull: false
		}
	}, {
		tableName: 'INVENTORY',
		timestamps: false,
		underscored: true
	});

	Inventory.associate = (db) => {
		Inventory.belongsTo(db.materials, {
			as: "material",
			foreignKey: {
				name: "material_id",
				allowNull: false
			},
			onDelete: "CASCADE"
		});

		Inventory.hasMany(db.loan_materials, {
			foreignKey: "inventory_id",
			sourceKey: 'id'
		});
	}

	return Inventory
};