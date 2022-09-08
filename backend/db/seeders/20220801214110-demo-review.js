'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:*/
     await queryInterface.bulkInsert(
       "Reviews",
       [
         {
           stars: 4,
           spotId: 1,
           userId: 1,
           review: "good,will come back",
         },
         {
           stars: 4,
           spotId: 2,
           userId: 2,
           review: "good,will come back",
         },
         {
           stars: 4,
           spotId: 3,
           userId: 3,
           review: "good,will come back",
         },
         {
           stars: 4,
           spotId: 4,
           userId: 4,
           review: "good,will come back",
         },
         {
           stars: 4,
           spotId: 5,
           userId: 5,
           review: "good,will come back",
         },
         {
           stars: 4,
           spotId: 6,
           userId: 1,
           review: "good,will come back",
         },
         {
           stars: 4,
           spotId: 7,
           userId: 2,
           review: "good,will come back",
         },
         {
           stars: 4,
           spotId: 8,
           userId: 3,
           review: "good,will come back",
         },
         {
           stars: 4,
           spotId: 9,
           userId: 4,
           review: "good,will come back",
         },
         {
           stars: 4,
           spotId: 10,
           userId: 5,
           review: "good,will come back",
         },
       ],
       {}
     );

  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:*/
      await queryInterface.bulkDelete("Reviews");

  }
};
