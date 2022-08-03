'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example: */
    await queryInterface.bulkInsert(
      "Spots",
      [
        {
          ownerId: 1,
          address: "123 Street1",
          city: "city1",
          state: "state1",
          country: "USA",
          lat: 37.7645358,
          lng: -122.4730327,
          name: "spot1",
          description: "Place where web developers are created",
          price: 123,
        },
        {
          ownerId: 2,
          address: "123 Street2",
          city: "city2",
          state: "state2",
          country: "USA",
          lat: 37.7645358,
          lng: -122.4730327,
          name: "spot2",
          description: "Place where web developers are created",
          price: 123,
        },
        {
          ownerId: 3,
          address: "123 Street3",
          city: "city3",
          state: "state3",
          country: "USA",
          lat: 37.7645358,
          lng: -122.4730327,
          name: "spot3",
          description: "Place where web developers are created",
          price: 123,
        },
        {
          ownerId: 4,
          address: "123 Street4",
          city: "city4",
          state: "state4",
          country: "USA",
          lat: 37.7645358,
          lng: -122.4730327,
          name: "spot4",
          description: "Place where web developers are created",
          price: 123,
        },
        {
          ownerId: 5,
          address: "123 Street5",
          city: "city5",
          state: "state5",
          country: "USA",
          lat: 37.7645358,
          lng: -122.4730327,
          name: "spot5",
          description: "Place where web developers are created",
          price: 123,
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
    await queryInterface.bulkDelete("Spots");

  }
};
