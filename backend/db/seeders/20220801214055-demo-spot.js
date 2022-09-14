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
          city: "South Lake Tahoe",
          state: "California",
          country: "USA",
          lat: 37.7645358,
          lng: -122.4730327,
          name: "Cozy Lakefront Home",
          description:
            "7 Sierra Shores - Steps to Lake Tahoe - Breathtaking Views",
          price: 919,
        },
        {
          ownerId: 2,
          address: "123 street",
          city: "Tahoma",
          state: "California",
          country: "USA",
          lat: 37.7645358,
          lng: -122.4730327,
          name: "Rubicon Bay Lake Front",
          description:
            "5BR with Private Dock, Buoy, Playground and Sandy Beach",
          price: 1862,
        },
        {
          ownerId: 3,
          address: "123 Street3",
          city: "South Lake Tahoe",
          state: "California",
          country: "USA",
          lat: 37.7645358,
          lng: -122.4730327,
          name: "Unbelievable Views of Lake Tahoe",
          description: "Lake Tahoe in Marla Bay, Nevada",
          price: 1200,
        },
        {
          ownerId: 4,
          address: "123 Street4",
          city: "South Lake Tahoe",
          state: "California",
          country: "USA",
          lat: 37.7645358,
          lng: -122.4730327,
          name: "Beachfront Tahoe Home",
          description:
            "Dreamy Lakeside Retreat w/ Shared Pools, Hot Tubs & Beach Access!",
          price: 570,
        },
        {
          ownerId: 5,
          address: "123 Street5",
          city: "South Lake Tahoe",
          state: "California",
          country: "USA",
          lat: 37.7645358,
          lng: -122.4730327,
          name: "Heavenly Village",
          description: "Walk to The Shops at Heavenly Village!",
          price: 950,
        },
        {
          ownerId: 1,
          address: "123 Street6",
          city: "Bass Lake",
          state: "California",
          country: "USA",
          lat: 37.7645358,
          lng: -122.4730327,
          name: "Rockhaven",
          description: "Meeks Bay with breathtaking view",
          price: 800,
        },
        {
          ownerId: 2,
          address: "123 Street7",
          city: "Groveland",
          state: "California",
          country: "USA",
          lat: 37.7645358,
          lng: -122.4730327,
          name: "Groveland Lake House near Yosemite",
          description: "Groveland Lake House w/ Hot Tub & Water Views",
          price: 1100,
        },
        {
          ownerId: 3,
          address: "123 Street8",
          city: "Glenbrook",
          state: "Nevada",
          country: "USA",
          lat: 37.7645358,
          lng: -122.4730327,
          name: "Villa De Lago The Lake House, Dock and Buoy",
          description:
            "VIlladeLago is located in a secluded enclave in historic Cave Rock Nevada.",
          price: 1000,
        },
        {
          ownerId: 4,
          address: "123 Street9",
          city: "Zephyr",
          state: "Nevada",
          country: "USA",
          lat: 37.7645358,
          lng: -122.4730327,
          name: "Lake Tahoe Shoreside Retreat: Stunning Lake Views!",
          description:
            "Charming Elk Point Country Club vacation rental",
          price: 900,
        },
        {
          ownerId: 5,
          address: "123 Street10",
          city: "Stateline",
          state: "Nevada",
          country: "USA",
          lat: 37.7645358,
          lng: -122.4730327,
          name: "Stylish 3 Bed / 4 Bath | Residence 205",
          description:
            "Tahoe Beach Club is a private lakefront community on Tahoe East Shore.",
          price: 1190,
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
