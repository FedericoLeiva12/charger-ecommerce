const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {

    sequelize.define('roles', {
        rol : {
            type : DataTypes.ENUM('admin', 'client', 'guest'),
            defaultValue: 'client'
        }
    });
}  