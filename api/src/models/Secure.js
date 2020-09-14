const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {

    sequelize.define('secure', {
        publicKey : {
            type : DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        privateKey: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        }
    });
}  