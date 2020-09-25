const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const checkout = sequelize.define("checkout", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true,
    },
    state: {
      type: DataTypes.ENUM(
        "pending",
        "processing",
        "shipping",
        "complete",
        "canceled"
      ),
      defaultValue: "pending",
    },
    paymentMethod: {
      type: DataTypes.STRING,
    },
    shippingAdress: {
      type: DataTypes.STRING,
    },
    token: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
    },
  });

  checkout.prototype.genToken = function genToken() {
    let res = "";
    let src = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    for (let i = 0; i < 6; i++) {
      res += src[Math.floor(Math.random() * src.length)];
    }

    this.token = res;
    return this.save();
  };

  checkout.prototype.cancelOrder = function cancelOrded() {
    return new Promise((res, rej) => {
      if (this.state !== "complete" && this.state !== "canceled") {
        this.state = "cancel";
        res(this.save());
      } else {
        rej(new Error("You can't cancel completed or canceled orders."));
      }
    });
  };
};
