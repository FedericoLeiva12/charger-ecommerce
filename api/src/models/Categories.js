const { DataTypes, Sequelize } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  sequelize.define('product', {
    id:{
      type : DataTypes.INTEGER,
      allowNull : false,
      primaryKey : true
    },
    nombre:{
      type : DataTypes.STRING,
      allowNull : false,
    }
  });
};

