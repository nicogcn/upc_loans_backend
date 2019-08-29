module.exports = function(sequelize, DataTypes){
	const Schedules = sequelize.define('schedules', {
		id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		dayOfWeek: {
			type: DataTypes.STRING(1),
			allowNull: false
		},
		timeInit: {
			type: DataTypes.TIME,
			allowNull: false
		},
		timeEnd: {
			type: DataTypes.TIME,
			allowNull: false
		}
	}, {
		tableName: 'SCHEDULES',
		timestamps: false,
		underscored: true
	});

	Schedules.associate = (db) => {
		Schedules.belongsTo(db.lessons, {
			as: "lesson",
			foreignKey: {
				name: "lesson_id",
				allowNull: false
			},
			onDelete: "CASCADE"
		});
	}

	return Schedules
};