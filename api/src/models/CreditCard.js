const { DataTypes } = require("sequelize");
const { User, Checkout } = require("./Categories");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  sequelize.define("creditCard", {
    cardNumber: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isCreditCard: true,
      },
      CardName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      expirationDate: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          is: /(0[1-9]|1[0-2])\/[0-9]{2}/,
        },

        CCV: {
          type: DataTypes.INTEGER,
          allowNull: false,
          validate: {
            is: /^[0-9]{3}$/,
          },
        },
      },
    },
  });
};
