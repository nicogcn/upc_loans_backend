module.exports = function(sequelize, DataTypes){
	const UserTypes = sequelize.define('user_types', {
		id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		type: {
			type: DataTypes.STRING(12),
			allowNull: false
		}
	}, {
		tableName: 'USER_TYPES',
		timestamps: false,
		underscored: true
	});

	UserTypes.associate = (db) => {
		UserTypes.hasMany(db.users, {
			foreignKey: {
				name: "user_type",
				allowNull: false
			},
			onDelete: "CASCADE",
			sourceKey: 'id'
		});


	/*	UserTypes.hasMany(db.users, {
			foreignKey: 'type_one',
			sourceKey: 'id'
		});
		UserTypes.hasMany(db.users, {
			foreignKey: 'type_two',
			sourceKey: 'id'
		});*/
	}

	return UserTypes
};