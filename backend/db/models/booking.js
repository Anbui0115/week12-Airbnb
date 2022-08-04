'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Booking.belongsTo(models.User,{foreignKey:'userId'})
       Booking.belongsTo(models.Spot, { foreignKey: "spotId" });
    }
  }
  Booking.init(
    {
      spotId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        // references: { model: "Spots" },
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        // references: { model: "Users" },
      },
      startDate: {
        type: DataTypes.STRING,
        allowNull: false,
        // validate: {
        //   isDate: true, // only allow date strings
        //   // isAfter: "2022-01-08",
        //   isAfter: new Date(),
        // },
      },
      endDate: {
        type: DataTypes.STRING,
        allowNull: false,
        // validate: {
        //   isDate: true, // only allow date strings
        //   // isAfter: "2022-01-08",
        //   isAfter: new Date(),
        // },
      },
    },
    {
      sequelize,
      modelName: "Booking",
    }
  );
  return Booking;
};
