module.exports = function (sequelize, DataTypes) {
    const LoansMaterials = sequelize.define('loans_materials', {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        }
    }, {
        tableName: 'LOANS_MATERIALS',
        timestamps: false,
        underscored: true
    });
    LoansMaterials.associate = (db) => {
        LoansMaterials.belongsTo(db.inventory, {
            as: "inventory",
            foreignKey: "inventory_id"
        });
    }

    return LoansMaterials
};
