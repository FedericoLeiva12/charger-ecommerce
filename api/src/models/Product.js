const { DataTypes, Sequelize } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('product', {
    name: {
      type : DataTypes.STRING,
      allowNull : false,
    },
    id:{
      type : DataTypes.INTEGER,
      allowNull :false,
      primaryKey : true
    },
    talle:{
      type : DataTypes.STRING,
      allowNull :false
    },
    precio:{
      type : DataTypes.FLOAT,
      allowNull :false
    },
    material:{
     type : DataTypes.ARRAY(Sequelize.TEXT),
     allowNull : true
    },
    marcas:{
      type : Sequelize.STRING,
      allowNull : true
    },
    colores:{
      type : Sequelize.ARRAY(Sequelize.TEXT),
      validate:{
        is : /[0-9a-fA-F]+/ 
      } /* Este ultimo contiene una validación con RegExp para numero Hex :
      Matches expression starting with a 0, following by either a lower or uppercase x, followed by one or more characters in the ranges 0-9, or a-f, or A-F */
    }
  });
};
