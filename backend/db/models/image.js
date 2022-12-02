"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Image extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Image.belongsTo(models.User, { foreignKey: "userId" });
      Image.belongsTo(models.Spot, { foreignKey: "spotId" });
      Image.belongsTo(models.Review, { foreignKey: "reviewId" });
    }
  }
  Image.init(
    {
      url: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isUrl: true,
        },
      },
      previewImage: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      spotId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        // references: { model: "Spots" },
      },
      reviewId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        // references: { model: "Reviews" },
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        // references: { model: "Users" },
      },
      ////////////////////////////////////////
      createdAt: {
        type: DataTypes.DATE,
        get() {
          const date = new Date(this.dataValues.createdAt);
          return `${date.toISOString().split("T")[0]} ${date.toLocaleTimeString(
            [],
            { timeStyle: "medium", hour12: false }
          )}`;
        },
      },
      updatedAt: {
        type: DataTypes.DATE,
        get() {
          const date = new Date(this.dataValues.updatedAt);
          return `${date.toISOString().split("T")[0]} ${date.toLocaleTimeString(
            [],
            { timeStyle: "medium", hour12: false }
          )}`;
        },
      },
    },
    {
      sequelize,
      modelName: "Image",
      scopes: {
        reviews: {
          attributes: ["id", "spotId", "userId", "url"],
        },
      },
    }
  );
  return Image;
};
