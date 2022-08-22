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
          url: "https://a0.muscache.com/im/pictures/8b49998c-569b-498d-8946-820a1a9f8633.jpg?im_w=960",
          previewImage: true,
          spotId: 1,
          reviewId: 1,
          userId: 1,
        },
        {
          url: "https://a0.muscache.com/im/pictures/f30f1698-6a6a-43aa-a624-8bf60adb29e0.jpg?im_w=960",
          previewImage: true,
          spotId: 2,
          reviewId: 2,
          userId: 2,
        },
        {
          url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-623943401509054565/original/1c03bfbc-09f5-42b5-9879-8b96f3ff41da.jpeg?im_w=960",
          previewImage: true,
          spotId: 3,
          reviewId: 3,
          userId: 3,
        },
        {
          url: "https://a0.muscache.com/im/pictures/619ab404-7a6c-4425-a79c-9459b1c00b1b.jpg?im_w=960",
          previewImage: true,
          spotId: 4,
          reviewId: 4,
          userId: 4,
        },
        {
          url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-45944904/original/edf846cb-9e54-49a6-9f37-d26d996e39c7.png?im_w=960",
          previewImage: true,
          spotId: 5,
          reviewId: 5,
          userId: 5,
        },
        {
          url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-45944904/original/6358438b-9c8c-4169-b4f5-cf94d38a0a03.jpeg?im_w=720",
          previewImage: true,
          spotId: 6,
          reviewId: 1,
          userId: 1,
        },
        {
          url: "https://a0.muscache.com/im/pictures/efd9b4fd-bd59-43c9-ab1a-c698ed4e70a6.jpg?im_w=720",
          previewImage: true,
          spotId: 7,
          reviewId: 1,
          userId: 2,
        },
        {
          url: "https://a0.muscache.com/im/pictures/4a505291-9675-4938-a866-b59731d832ee.jpg?im_w=720",
          previewImage: true,
          spotId: 8,
          reviewId: 3,
          userId: 3,
        },
        {
          url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-45944904/original/dedc1efb-72a7-40a3-b94f-0bed51823a11.png?im_w=1200",
          previewImage: true,
          spotId: 9,
          reviewId: 4,
          userId: 4,
        },
        {
          url: "https://a0.muscache.com/im/pictures/monet/Luxury-24231595/original/de6f45e3-232f-403a-a848-d9bec0e28eb1?im_w=1200",
          previewImage: true,
          spotId: 10,
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
    await queryInterface.bulkDelete("Images");
  },
};
