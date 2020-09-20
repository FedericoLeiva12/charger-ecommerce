const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("checkout", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true,
    },
    state: {
      type: DataTypes.ENUM("pending", "shipping", "complete"),
      defaultValue: "pending",
    },
    shipOrder: {
      type: DataTypes.VIRTUAL,
      set() {
        if (this.state === "shipping") {
          throw new Error("This order is already on shipping");
        }
        return this.setDataValues("state", "shipping");
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
    },
  });
};
