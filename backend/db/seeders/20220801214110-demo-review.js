"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
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
          review:
            "Tiny home was the perfect little getaway after a long weekend of hiking around Yosemite. The home and decor were very cute and the pool was a nice touch",
        },
        {
          stars: 4,
          spotId: 2,
          userId: 2,
          review:
            "Amazing get away! Already planning our next trip here for the near future. Comfy cozy location with great views.",
        },
        {
          stars: 4,
          spotId: 3,
          userId: 3,
          review:
            "Hands down one of my favorite Airbnb experiences. This place was an amazing respite for a solo adventure. I loved everything about this place",
        },
        {
          stars: 4,
          spotId: 4,
          userId: 4,
          review: "The tiny house was very cute and at a good location.",
        },
        {
          stars: 4,
          spotId: 5,
          userId: 5,
          review:
            "We had a great time we stayed 4 nights and enjoyed the pool during the heat of the daytime, drinks on the porch and the house was really close to the rodeo grounds.",
        },
        {
          stars: 4,
          spotId: 6,
          userId: 1,
          review:
            " It was clean and it looked exactly like the photos. Our expectations for the tiny house were set perfectly prior to arrival and we really enjoyed it!",
        },
        {
          stars: 4,
          spotId: 7,
          userId: 2,
          review:
            "My kiddos enjoyed the pool and the tiny house experience. Very private, quiet, and charming. It was an added bonus to our trip to Yosemite!",
        },
        {
          stars: 4,
          spotId: 8,
          userId: 3,
          review:
            "This cute tiny home was perfect for relaxing after doing a section of the JMT. Was only an hour and a half from Yosemite valley- floating in the pool after a long hike is definitely the way to go!",
        },
        {
          stars: 5,
          spotId: 9,
          userId: 4,
          review: "A Unforgettable And Fantastic Stay.",
        },
        {
          stars: 4,
          spotId: 10,
          userId: 5,
          review:
            "The pool is an amazing addition to the space, we loved it! It was unfortunate that we couldn’t visit the park due to the fires.",
        },
        {
          stars: 4,
          spotId: 10,
          userId: 1,
          review:
            "This has to be one of my favorite airbnb finds! the horse trough pool was perfect! The loft bed was so comfy and I didn't want to leave the couch.",
        },
        {
          stars: 4,
          spotId: 9,
          userId: 2,
          review:
            "This has to be one of my favorite airbnb finds! the horse trough pool was perfect! The loft bed was so comfy and I didn't want to leave the couch.",
        },
        {
          stars: 4,
          spotId: 8,
          userId: 3,
          review:
            "Lovely place to stay at!! My best friend and I had a girls trip and it was so relaxing. Our favorite part was stargazing late at night in the pool!",
        },
        {
          stars: 4,
          spotId: 7,
          userId: 4,
          review:
            "Lovely place to stay at!! My best friend and I had a girls trip and it was so relaxing. Our favorite part was stargazing late at night in the pool!",
        },
        {
          stars: 4,
          spotId: 6,
          userId: 5,
          review:
            "We had a great time we stayed 4 nights and enjoyed the pool during the heat of the daytime, drinks on the porch and the house was really close to the rodeo grounds.",
        },
        {
          stars: 4,
          spotId: 5,
          userId: 1,
          review:
            "My kiddos enjoyed the pool and the tiny house experience. Very private, quiet, and charming. It was an added bonus to our trip to Yosemite!",
        },
        {
          stars: 4,
          spotId: 4,
          userId: 2,
          review:
            " It was clean and it looked exactly like the photos. Our expectations for the tiny house were set perfectly prior to arrival and we really enjoyed it!.",
        },
        {
          stars: 4,
          spotId: 3,
          userId: 3,
          review:
            "I had a great stay in this tiny house! It was cool enough in the evenings and early mornings to use the bar table and open the big window. I enjoyed floating in the pool after hiking in Yosemite.",
        },
        {
          stars: 5,
          spotId: 2,
          userId: 4,
          review:
            "Good location in the mountains. 45 minutes away from Yosemite entrance. Very clean.",
        },
        {
          stars: 5,
          spotId: 1,
          userId: 5,
          review:
            "This is a must stay! The house was decorated beautifully and had great amenities. We loved eating at the bartop and spending time in the pool.",
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
    await queryInterface.bulkDelete("Reviews");
  },
};
