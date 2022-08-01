"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example: */
    await queryInterface.bulkInsert(
      "Images",
      [
        {
          url: "will be added",
          previewImage: false,
          spotId: 1,
          reviewId: 1,
          userId: 1,
        },
        {
          url: "willbeadded",
          previewImage: false,
          spotId: 2,
          reviewId: 2,
          userId: 2,
        },
        {
          url: "will-be-added",
          previewImage: false,
          spotId: 3,
          reviewId: 3,
          userId: 3,
        },
        {
          url: "will add soon",
          previewImage: false,
          spotId: 4,
          reviewId: 4,
          userId: 4,
        },
        {
          url: "to be updated",
          previewImage: false,
          spotId: 5,
          reviewId: 5,
          userId: 5,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:*/
    await queryInterface.bulkDelete("Images", {
      spotId: { [Op.in]: ["user1", "user2", "user3", "user4", "user5"] },
    });
  },
};
