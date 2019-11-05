module.exports = function(sequelize, DataTypes){
	const Loans = sequelize.define('loans', {
		id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		requested_date: {
			type: DataTypes.DATEONLY,
			allowNull: false
		},
		requested_time_init: {
			type: DataTypes.TIME,
			allowNull: false
		},
		requested_time_end: {
			type: DataTypes.TIME,
			allowNull: false
		},
		loan_time_init: {
			type: DataTypes.TIME,
			allowNull: true
		},
		loan_time_end: {
			type: DataTypes.TIME,
			allowNull: true
		},
		status: {
			type: DataTypes.ENUM,
			values: ['REQUEST_PENDING','REQUEST_CANCELED', 'REQUEST_APPROVED','REQUEST_REJECTED', 'IN_USE', 'FINISHED'],
			allowNull: false,
			defaultValue: 'REQUEST_PENDING'
		}
	}, {
		tableName: 'LOANS',
		timestamps: true,
		underscored: true
	});

	Loans.associate = (db) => {
		Loans.belongsTo(db.laboratories, {
			as: "laboratory",
			foreignKey: {
				name: "laboratory_id",
				allowNull: false
			},
			onDelete: "CASCADE"
		});

		Loans.belongsTo(db.users, {
			as: "student",
			foreignKey: {
				name: "student_id",
				allowNull: false
			},
			onDelete: "CASCADE"
		});

		Loans.belongsTo(db.users, {
			as: "manager",
			foreignKey: "manager_id"
		});

		Loans.hasMany(db.loan_materials, {
			foreignKey: {
				name: "loan_id",
				allowNull: false
			},
            as: "materials",
			onDelete: "CASCADE",
			sourceKey: 'id'
		});
	}

	return Loans
};
