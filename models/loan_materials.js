module.exports = function (sequelize, DataTypes) {
    const LoanMaterials = sequelize.define('loan_materials', {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        }
    }, {
        tableName: 'LOAN_MATERIALS',
        timestamps: false,
        underscored: true
    });
    LoanMaterials.associate = (db) => {
        LoanMaterials.belongsTo(db.inventory, {
            as: "inventory",
            foreignKey: "inventory_id"
        });
        
        LoanMaterials.belongsTo(db.loans, {
            as: "loan",
            foreignKey: {
				name: "loan_id",
				allowNull: false
			},
			onDelete: "CASCADE"
        });
        
        LoanMaterials.belongsTo(db.materials, {
            as: "material",
            foreignKey: {
				name: "material_id",
				allowNull: false
			},
			onDelete: "CASCADE"
        });
    }

    return LoansMaterials
};
