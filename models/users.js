module.exports = function(sequelize, DataTypes) {
	const User= sequelize.define('users', {
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
		email: {
			type: DataTypes.STRING(50),
			allowNull: false
		},
		password: {
			type: DataTypes.STRING(50),
			allowNull: false
		},
		rfid: {
			type: DataTypes.STRING(30),
			allowNull: true
		},
		is_active: {
			type: DataTypes.BOOLEAN,
			allowNull: false
		}
	}, {
		tableName: 'USERS',
		timestamps: true,
		underscored: true
	});

	User.associate = (db) => {

		User.belongsTo(db.user_types, {
			as: "type",
			foreignKey: {
				name: "user_type",
				allowNull: false
			},
			onDelete: "CASCADE"
		});

		User.hasMany(db.lessons, {
			foreignKey: {
				name: "teacher_id",
				allowNull: false
			},
			onDelete: "CASCADE",
			sourceKey: 'id'
		});

		User.hasMany(db.loans, {
			foreignKey: {
				name: "student_id",
				allowNull: false
			},
			onDelete: "CASCADE",
			sourceKey: 'id'
		});

		User.hasMany(db.loans, {
			foreignKey: "manager_id",
			onDelete: "CASCADE",
			sourceKey: 'id'
		});
		/*
		User.belongsTo(db.user_types, {
			as: "type",
			foreignKey: "type_one"
		});

		User.belongsTo(db.user_types, {
			as: "other_type",
			foreignKey: "type_two"
		});*/
	}
	// to autenticate method: https://medium.freecodecamp.org/securing-node-js-restful-apis-with-json-web-tokens-9f811a92bb52

	return User
};