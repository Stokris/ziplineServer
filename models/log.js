module.exports = function (sequelize, DataTypes) {
    return sequelize.define('log', {
        parks: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        time: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        people: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        price: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        owner_properties: {
            type: DataTypes.STRING,
            allowNull: false
        }
    })
}