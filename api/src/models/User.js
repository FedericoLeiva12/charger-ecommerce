const { DataTypes } = require('sequelize');
const {Categories} = require ('./Categories')
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('user', {
    email : {
          type : DataTypes.STRING,
          allowNull : false,
          validate : {
            isEmail : true,
            notEmpty : true,
            
          }
      },

    password : {
        type : DataTypes.STRING,
        allowNull : false,
        validate : {
          is : /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
        }
    }
  });
};

