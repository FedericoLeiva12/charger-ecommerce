const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {
  
  sequelize.define('img', {
    url : {
	type : DataTypes.STRING,
	allowNull : false,
	validate :{
	  isUrl: true
	}
      }
  });
};
