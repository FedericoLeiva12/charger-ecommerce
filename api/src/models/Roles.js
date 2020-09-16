const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Roles = sequelize.define("roles", {
    rol: {
      type: DataTypes.ENUM("admin", "client", "guest"),
      defaultValue: "guest",
    },
  });
  Roles.prototype.setAdmin = function () {};
};
