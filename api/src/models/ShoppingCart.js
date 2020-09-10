const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("checkout", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    content: {
      type: DataTypes.ARRAY(DataTypes.STRING),
    },
    state: {
      type: DataTypes.ENUM("open", "closed"),
      defaultValue: "open",
    },
    closeCart: {
      type: DataTypes.VIRTUAL,
      set() {
        if (this.state === "open") {
          return this.setDataValue("state", "closed");
        }
        throw new Error('state value is already "open"');
      },
    },
    openCart: {
      type: DataTypes.VIRTUAL,
      set() {
        if (this.state === "closed") {
          return this.setDataValue("state", "open");
        }
        throw new Error('state value is already "closed"');
      },
    },
  });
};
