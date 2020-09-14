const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {

    sequelize.define('secure', {
        publicKey : {
            type : DataTypes.STRING(1024),
            allowNull: false,
            unique: true
        },
        privateKey: {
            type: DataTypes.STRING(1024),
            allowNull: false,
            unique: true
        }
    });
}  