const { DataTypes, Sequelize } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  sequelize.define('categories', {
    id:{
      type : DataTypes.INTEGER,
      allowNull : false,
      primaryKey : true
    },
    name:{
      type : DataTypes.STRING,
      allowNull : false,
    }
  });
};

