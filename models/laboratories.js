module.exports = function(sequelize, DataTypes){
	const Laboratories = sequelize.define('laboratories', {
		id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		name: {
			type: DataTypes.STRING(30),
			allowNull: false
		}
	}, {
		tableName: 'LABORATORIES',
		timestamps: false,
		underscored: true
	});

	Laboratories.associate = (db) => {
		Laboratories.hasMany(db.lessons, {
			foreignKey: {
				name: "laboratory_id",
				allowNull: false
			},
			onDelete: "CASCADE",
			sourceKey: 'id'
		});

		Laboratories.hasMany(db.materials, {
			foreignKey: "laboratory_id",
			sourceKey: 'id'
		});

		Laboratories.hasMany(db.loans, {
			foreignKey: {
				name: "laboratory_id",
				allowNull: false
			},
			onDelete: "CASCADE",
			sourceKey: 'id'
		});
	}

	return Laboratories
};