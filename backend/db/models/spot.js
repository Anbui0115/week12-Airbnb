"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Spot extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Spot.belongsToMany(models.User, { through: models.Booking });
      // Spot.hasMany(models.Booking, { foreignKey: "spotId" });
      Spot.belongsTo(models.User, { foreignKey: "ownerId" });
      Spot.hasMany(models.Image, { foreignKey: "spotId" });
      Spot.hasMany(models.Review, { foreignKey: "spotId" });
    }
  }
  Spot.init(
    {
      ownerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        // references: { model: "Users" },
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [10],
        },
      },
      city: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      state: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      country: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lat: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        validate: {
         min: -90,
          max: 90
    }
      },
      lng: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        validate: {
        min: -180,
        max: 180
    }
      },
      name: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Spot",
    }
  );
  return Spot;
};
