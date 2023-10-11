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
          previewImage:
            "https://a0.muscache.com/im/pictures/8b49998c-569b-498d-8946-820a1a9f8633.jpg?im_w=960",
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
          previewImage:
            "https://a0.muscache.com/im/pictures/f30f1698-6a6a-43aa-a624-8bf60adb29e0.jpg?im_w=960",
        },
        {
          ownerId: 3,
          address: "123 Street3",
          city: "South Lake Tahoe",
          state: "California",
          country: "USA",
          lat: 37.7645358,
          lng: -122.4730327,
          name: "Lake Tahoe in Marla Bay",
          description: "Unbelievable Views of Lake Tahoe",
          price: 1200,
          previewImage:
            "https://a0.muscache.com/im/pictures/prohost-api/Hosting-623943401509054565/original/1c03bfbc-09f5-42b5-9879-8b96f3ff41da.jpeg?im_w=960",
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
          previewImage:
            "https://a0.muscache.com/im/pictures/619ab404-7a6c-4425-a79c-9459b1c00b1b.jpg?im_w=960",
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
          previewImage:
            "https://a0.muscache.com/im/pictures/prohost-api/Hosting-45944904/original/edf846cb-9e54-49a6-9f37-d26d996e39c7.png?im_w=960",
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
          previewImage:
            "https://a0.muscache.com/im/pictures/prohost-api/Hosting-45944904/original/6358438b-9c8c-4169-b4f5-cf94d38a0a03.jpeg?im_w=720",
        },
        {
          ownerId: 2,
          address: "123 Street7",
          city: "Groveland",
          state: "California",
          country: "USA",
          lat: 37.7645358,
          lng: -122.4730327,
          name: "Groveland Lake House",
          description:
            "Groveland Lake House near Yosemite with Hot Tub & Water Views",
          price: 1100,
          previewImage:
            "https://a0.muscache.com/im/pictures/efd9b4fd-bd59-43c9-ab1a-c698ed4e70a6.jpg?im_w=720",
        },
        {
          ownerId: 3,
          address: "123 Street8",
          city: "Glenbrook",
          state: "Nevada",
          country: "USA",
          lat: 37.7645358,
          lng: -122.4730327,
          name: "Villa De Lago ",
          description:
            "VIlladeLago The Lake House, Dock and Buoy is located in a secluded enclave in historic Cave Rock Nevada.",
          price: 1000,
          previewImage:
            "https://a0.muscache.com/im/pictures/4a505291-9675-4938-a866-b59731d832ee.jpg?im_w=720",
        },
        {
          ownerId: 4,
          address: "123 Street9",
          city: "Zephyr",
          state: "Nevada",
          country: "USA",
          lat: 37.7645358,
          lng: -122.4730327,
          name: "Lake Tahoe Shoreside Retreat",
          description:
            "Charming Elk Point Country Club vacation rental: Stunning Lake Views!",
          price: 900,
          previewImage:
            "https://a0.muscache.com/im/pictures/prohost-api/Hosting-45944904/original/dedc1efb-72a7-40a3-b94f-0bed51823a11.png?im_w=1200",
        },
        {
          ownerId: 5,
          address: "123 Street10",
          city: "Stateline",
          state: "Nevada",
          country: "USA",
          lat: 37.7645358,
          lng: -122.4730327,
          name: "Tahoe Home in Sunset Mag",
          description:
            "Our cozy modern cabin on the beautiful West Shore of Lake Tahoe. Walk to Sugar Pine public beach, coffee shops, restaurants and markets! ",
          price: 1190,
          previewImage:
            "https://a0.muscache.com/im/pictures/miso/Hosting-47870127/original/239c7f2f-470f-424c-9574-c4b212ca4350.jpeg?im_w=720",
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
