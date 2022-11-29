"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:*/
    await queryInterface.bulkInsert(
      "Bookings",
      [
        {
          spotId: 1,
          userId: 1,
          startDate: "2022-11-01",
          endDate: "2022-11-02",
        },
        {
          spotId: 2,
          userId: 2,
          startDate: "2022-11-03",
          endDate: "2022-11-04",
        },
        {
          spotId: 3,
          userId: 3,
          startDate: "2022-11-05",
          endDate: "2022-11-06",
        },
        {
          spotId: 4,
          userId: 4,
          startDate: "2022-11-07",
          endDate: "2022-11-08",
        },
        {
          spotId: 5,
          userId: 5,
          startDate: "2022-11-09",
          endDate: "2022-11-10",
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
    await queryInterface.bulkDelete("Bookings");
  },
};


// let today = new Date().toISOString().split("T")[0];

// const bookings = [
//   {
//     spotId: 1,
//     userId: 1,
//     startDate: today,
//     endDate: today,
//   },
//   {
//     spotId: 2,
//     userId: 2,
//     startDate: today,
//     endDate: today,
//   },
//   {
//     spotId: 3,
//     userId: 3,
//     startDate: today,
//     endDate: today,
//   },
//   {
//     spotId: 3,
//     userId: 2,
//     startDate: today,
//     endDate: today,
//   },
//   {
//     spotId: 3,
//     userId: 1,
//     startDate: today,
//     endDate: today,
//   },
//   {
//     spotId: 2,
//     userId: 3,
//     startDate: today,
//     endDate: today,
//   },
// ];

// module.exports = {
//   async up(queryInterface, Sequelize) {
//     /**
//      * Add seed commands here.
//      *
//      * Example:
//      *   name: 'John Doe',
//      *   isBetaMember: false
//      * }], {});
//      */
//     await queryInterface.bulkInsert("Bookings", bookings, {});
//   },

//   async down(queryInterface, Sequelize) {
//     /**
//      * Add commands to revert seed here.
//      *
//      * Example:
//      * await queryInterface.bulkDelete('People', null, {});
//      */
//     await queryInterface.bulkDelete("Bookings", {}, {});
//   },
// };
