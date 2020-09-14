const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {

    sequelize.define('secure', {
        publicKey : {
            type : DataTypes.TEXT,
            allowNull: false,
            unique: true
        },
        privateKey: {
            type: DataTypes.TEXT,
            allowNull: false,
            unique: true
        }
    });
}  