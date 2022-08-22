"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example: */
    await queryInterface.bulkInsert(
      "Spots",
      [
        {
          ownerId: 1,
          address: "7 Sierra Shores",
          city: "city1",
          state: "state1",
          country: "USA",
          lat: 37.7645358,
          lng: -122.4730327,
          name: "Cozy Lakefront Home",
          description: "Place where web developers are created",
          price: 123,
        },
        {
          ownerId: 2,
          address: "123 street",
          city: "city2",
          state: "state2",
          country: "USA",
          lat: 37.7645358,
          lng: -122.4730327,
          name: "Rubicon Bay Lake Front",
          description:
            "5BR with Private Dock, Buoy, Playground and Sandy Beach",
          price: 1904,
        },
        {
          ownerId: 3,
          address: "123 Street3",
          city: "city3",
          state: "state3",
          country: "USA",
          lat: 37.7645358,
          lng: -122.4730327,
          name: "Unbelievable Views of Lake Tahoe",
          description: "Lake Tahoe in Marla Bay, Nevada",
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
          name: "Beachfront Tahoe Home",
          description: "Amazing lakeside location",
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
          name: "Heavenly Village",
          description: "Walk to The Shops at Heavenly Village!",
          price: 123,
        },
        {
          ownerId: 1,
          address: "123 Street6",
          city: "city6",
          state: "state6",
          country: "USA",
          lat: 37.7645358,
          lng: -122.4730327,
          name: "Rockhaven",
          description: "Meeks Bay",
          price: 1000,
        },
        {
          ownerId: 2,
          address: "123 Street7",
          city: "city7",
          state: "state7",
          country: "USA",
          lat: 37.7645358,
          lng: -122.4730327,
          name: "Lake Tahoe",
          description: "Lake Tahoe",
          price: 1000,
        },
        {
          ownerId: 3,
          address: "123 Street8",
          city: "city8",
          state: "state8",
          country: "USA",
          lat: 37.7645358,
          lng: -122.4730327,
          name: "Groveland",
          description: "Groveland",
          price: 1000,
        },
        {
          ownerId: 4,
          address: "123 Street9",
          city: "city9",
          state: "state9",
          country: "USA",
          lat: 37.7645358,
          lng: -122.4730327,
          name: "Groveland",
          description: "Groveland",
          price: 1000,
        },
        {
          ownerId: 5,
          address: "123 Street10",
          city: "city10",
          state: "state10",
          country: "USA",
          lat: 37.7645358,
          lng: -122.4730327,
          name: "Stateline",
          description: "Stateline",
          price: 1000,
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
    await queryInterface.bulkDelete("Spots");
  },
};
