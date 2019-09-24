module.exports = function(sequelize, DataTypes){
	const Loans = sequelize.define('loans', {
		id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		requestedDate: {
			type: DataTypes.DATEONLY,
			allowNull: false
		},
		requestedTimeInit: {
			type: DataTypes.TIME,
			allowNull: false
		},
		requestedTimeEnd: {
			type: DataTypes.TIME,
			allowNull: false
		},
		loanTimeInit: {
			type: DataTypes.TIME,
			allowNull: true
		},
		loanTimeEnd: {
			type: DataTypes.TIME,
			allowNull: true
		},
		status: {
			type: DataTypes.ENUM,
			values: ['REQUESTED_PENDING','REQUESTED_APPROVED','REQUESTED_REJECTED', 'IN_USE', 'FINISHED']
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

		Loans.belongsToMany(db.materials, {
			as: "materials",
			through: db.loans_materials
		});
	}

	return Loans
};