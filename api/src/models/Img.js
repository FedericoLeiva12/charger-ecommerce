const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {
  sequelize.define('img', {
    url : {
	  type : DataTypes.STRING,
	  lowNull : false,
	  validate :{
	    isUrl: true
	  }
    }
  });
};
