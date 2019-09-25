module.exports = function(sequelize, DataTypes){
	const Materials = sequelize.define('materials', {
		id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		name: {
			type: DataTypes.STRING(75),
			allowNull: false
		},
		mark: {
			type: DataTypes.STRING(30),
			allowNull: true
		}
	}, {
		tableName: 'MATERIALS',
		timestamps: false,
		underscored: true
	});

	Materials.associate = (db) => {
		Materials.hasMany(db.inventory, {
			foreignKey: {
				name: "material_id",
				allowNull: false
			},
			onDelete: "CASCADE",
			sourceKey: 'id'
		});

		Materials.belongsTo(db.laboratories, {
			as: "laboratory",
			foreignKey: "laboratory_id"
		});

        
        Materials.hasMany(db.loan_materials, {
			foreignKey: {
				name: "material_id",
				allowNull: false
			},
            as: "loans",
			onDelete: "CASCADE",
			sourceKey: 'id'
		});
		
	}

	return Materials
};