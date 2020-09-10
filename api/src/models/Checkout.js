const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("checkout", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    state: {
      type: DataTypes.ENUM("pending", "complete"),
    },
    completeOrder: {
      type: DataTypes.VIRTUAL,
      set() {
        if (this.state === "complete") {
          throw new Error("This order is already completed");
        }
        return this.setDataValues("state", "complete");
      },
    },
  });
};
