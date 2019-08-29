module.exports = function(sequelize, DataTypes){
	const Lessons = sequelize.define('lessons', {
		id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		group: {
			type: DataTypes.INTEGER(2),
			allowNull: false
		},
		name: {
			type: DataTypes.STRING(30),
			allowNull: false
		}
	}, {
		tableName: 'LESSONS',
		timestamps: false,
		underscored: true
	});

	Lessons.associate = (db) => {
		Lessons.belongsTo(db.users, {
			as: "teacher",
			foreignKey: {
				name: "teacher_id",
				allowNull: false
			},
			onDelete: "CASCADE"
		});

		Lessons.belongsTo(db.laboratories, {
			as: "laboratory",
			foreignKey: {
				name: "laboratory_id",
				allowNull: false
			},
			onDelete: "CASCADE"
		});

		Lessons.hasMany(db.schedules, {
			foreignKey: {
				name: "lesson_id",
				allowNull: false
			},
			onDelete: "CASCADE",
			sourceKey: 'id'
		});
	}

	return Lessons
};