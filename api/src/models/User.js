const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {

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

