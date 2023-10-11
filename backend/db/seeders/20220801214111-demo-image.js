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
          url: "https://a0.muscache.com/im/pictures/46123984/c4e8f6c6_original.jpg?im_w=1200",
          previewImage: true,
          spotId: 1,
          // reviewId: 1,
          userId: 1,
        },
        {
          url: "https://a0.muscache.com/im/pictures/46124097/ed30bcdb_original.jpg?im_w=1200",
          previewImage: true,
          spotId: 1,
          // reviewId: 1,
          userId: 1,
        },
        {
          url: "https://a0.muscache.com/im/pictures/46124054/d82891e2_original.jpg?im_w=1200",
          previewImage: true,
          spotId: 1,
          // reviewId: 1,
          userId: 1,
        },
        {
          url: "https://a0.muscache.com/im/pictures/6d4d524b-deb6-4380-af51-1c312093eb9a.jpg?im_w=1200",
          previewImage: true,
          spotId: 1,
          // reviewId: 1,
          userId: 1,
        },
        {
          url: "https://a0.muscache.com/im/pictures/11124738/4e92a2a8_original.jpg?im_w=1200",
          previewImage: true,
          spotId: 1,
          // reviewId: 1,
          userId: 1,
        },
        {
          url: "https://a0.muscache.com/im/pictures/2cd94e16-d5f7-4473-b5dd-8afd17b11fe3.jpg?im_w=1200",
          previewImage: true,
          spotId: 2,
          // reviewId: 2,
          userId: 2,
        },
        {
          url: "https://a0.muscache.com/im/pictures/0ea9c7fc-dcea-4ebf-927f-07d9e4482d24.jpg?im_w=720",
          previewImage: true,
          spotId: 2,
          // reviewId: 2,
          userId: 2,
        },
        {
          url: "https://a0.muscache.com/im/pictures/4ab203a4-05fb-4343-895b-2a955f829c37.jpg?im_w=720",
          previewImage: true,
          spotId: 2,
          // reviewId: 2,
          userId: 2,
        },
        {
          url: "https://a0.muscache.com/im/pictures/d137448f-4fa7-4e93-8d1b-1d124e0a8670.jpg?im_w=1200",
          previewImage: true,
          spotId: 2,
          // reviewId: 2,
          userId: 2,
        },
        {
          url: "https://a0.muscache.com/im/pictures/f46361a7-0c38-4f2c-aadc-bcd21de8d3b0.jpg?im_w=720",
          previewImage: true,
          spotId: 2,
          // reviewId: 2,
          userId: 2,
        },
        {
          url: "https://a0.muscache.com/im/pictures/58f447f3-4142-4df9-9fb2-ef92351b71ec.jpg?im_w=720",
          previewImage: true,
          spotId: 3,
          // reviewId: 3,
          userId: 3,
        },
        {
          url: "https://a0.muscache.com/im/pictures/f1e32acb-af59-4f21-9e3b-4df10bbb8497.jpg?im_w=1200",
          previewImage: true,
          spotId: 3,
          // reviewId: 3,
          userId: 3,
        },
        {
          url: "https://a0.muscache.com/im/pictures/2cd24b41-fad7-4118-8f44-a1a635614564.jpg?im_w=720",
          previewImage: true,
          spotId: 3,
          // reviewId: 3,
          userId: 3,
        },
        {
          url: "https://a0.muscache.com/im/pictures/149167d8-8412-4af5-91cc-eb9195bf7c26.jpg?im_w=720",
          previewImage: true,
          spotId: 3,
          // reviewId: 3,
          userId: 3,
        },
        {
          url: "https://a0.muscache.com/im/pictures/69bb9399-6fb4-45ec-8777-77fb59625090.jpg?im_w=720",
          previewImage: true,
          spotId: 3,
          // reviewId: 3,
          userId: 3,
        },
        {
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-582573931021615910/original/6bb7e940-7566-4391-acb7-dc0006392a35.jpeg?im_w=720",
          previewImage: true,
          spotId: 4,
          // reviewId: 4,
          userId: 4,
        },
        {
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-582573931021615910/original/0155cc15-b09b-47c9-86ab-0a78630383b5.jpeg?im_w=720",
          previewImage: true,
          spotId: 4,
          // reviewId: 4,
          userId: 4,
        },
        {
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-582573931021615910/original/df273d87-6bc7-4b1c-a6a3-3ee8e0b411db.jpeg?im_w=720",
          previewImage: true,
          spotId: 4,
          // reviewId: 4,
          userId: 4,
        },
        {
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-582573931021615910/original/d8c6dc96-130d-4384-ad69-e11e88de9825.jpeg?im_w=1200",
          previewImage: true,
          spotId: 4,
          // reviewId: 4,
          userId: 4,
        },
        {
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-582573931021615910/original/0123ad58-2bce-478a-9f71-954266c97dd4.jpeg?im_w=1200",
          previewImage: true,
          spotId: 4,
          // reviewId: 4,
          userId: 4,
        },
        {
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-47818404/original/448f2c61-285e-47da-94bf-2becedca42c4.jpeg?im_w=720",
          previewImage: true,
          spotId: 5,
          // reviewId: 5,
          userId: 5,
        },
        {
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-47818404/original/9ce1750b-e9ac-4167-8f82-e29b7e9d1a67.jpeg?im_w=720",
          previewImage: true,
          spotId: 5,
          // reviewId: 5,
          userId: 5,
        },
        {
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-47818404/original/c0ae78c2-83e8-4409-a19b-865b8804f9ea.jpeg?im_w=1200",
          previewImage: true,
          spotId: 5,
          // reviewId: 5,
          userId: 5,
        },
        {
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-47818404/original/264289e9-f8c4-4e90-8b93-4eb393503a1b.jpeg?im_w=1200",
          previewImage: true,
          spotId: 5,
          // reviewId: 5,
          userId: 5,
        },
        {
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-47818404/original/5cf93580-1ae5-4207-bff8-2e47b1562606.jpeg?im_w=720",
          previewImage: true,
          spotId: 5,
          // reviewId: 5,
          userId: 5,
        },

        {
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-23253649/original/c29598f5-eab2-4799-8d38-7ad4c33b62fa.jpeg?im_w=1200",
          previewImage: true,
          spotId: 6,
          // reviewId: 1,
          userId: 1,
        },
        {
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-23253649/original/e3029c43-f8e7-4c62-b494-3de975580985.jpeg?im_w=1200",
          previewImage: true,
          spotId: 6,
          // reviewId: 1,
          userId: 1,
        },
        {
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-23253649/original/b70bccc6-36f9-42e6-9631-5115a7d25c9e.jpeg?im_w=720",
          previewImage: true,
          spotId: 6,
          // reviewId: 1,
          userId: 1,
        },
        {
          url: "https://a0.muscache.com/im/pictures/3119b9a2-2f32-410f-a51f-81ef69f0c5d4.jpg?im_w=720",
          previewImage: true,
          spotId: 6,
          // reviewId: 1,
          userId: 1,
        },
        {
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-23253649/original/c0aadc1e-acc8-4b2d-89af-7cd387a12497.jpeg?im_w=1200",
          previewImage: true,
          spotId: 6,
          // reviewId: 1,
          userId: 1,
        },
        {
          url: "https://a0.muscache.com/im/pictures/8fa6a6c2-c398-4bd2-812f-d74c32ac4949.jpg?im_w=1200",
          previewImage: true,
          spotId: 7,
          // reviewId: 1,
          userId: 2,
        },
        {
          url: "https://a0.muscache.com/im/pictures/a3a988f1-ebdf-484a-8799-21b8ab961e6b.jpg?im_w=720",
          previewImage: true,
          spotId: 7,
          // reviewId: 1,
          userId: 2,
        },
        {
          url: "https://a0.muscache.com/im/pictures/df5f0484-3f74-430c-acc7-97c9770a2b58.jpg?im_w=1200",
          previewImage: true,
          spotId: 7,
          // reviewId: 1,
          userId: 2,
        },
        {
          url: "https://a0.muscache.com/im/pictures/99bacb10-ed78-4c28-a175-ffc641fd855d.jpg?im_w=1200",
          previewImage: true,
          spotId: 7,
          // reviewId: 1,
          userId: 2,
        },
        {
          url: "https://a0.muscache.com/im/pictures/d4e2dbe0-813a-4faa-be8d-75e24f88f238.jpg?im_w=1200",
          previewImage: true,
          spotId: 7,
          // reviewId: 1,
          userId: 2,
        },
        {
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-3874424/original/a848b178-4138-40e5-bb2f-6589104bc1cb.jpeg?im_w=1200",
          previewImage: true,
          spotId: 8,
          // reviewId: 3,
          userId: 3,
        },
        {
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-3874424/original/5889a88e-a4f8-4c63-89c2-6d9c60e1aea0.jpeg?im_w=720",
          previewImage: true,
          spotId: 8,
          // reviewId: 3,
          userId: 3,
        },
        {
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-3874424/original/c31b244c-8d3b-467f-b108-716762fa662f.jpeg?im_w=720",
          previewImage: true,
          spotId: 8,
          // reviewId: 3,
          userId: 3,
        },
        {
          url: "https://a0.muscache.com/im/pictures/0bd53ec6-0771-4177-aafc-424175ed8355.jpg?im_w=720",
          previewImage: true,
          spotId: 8,
          // reviewId: 3,
          userId: 3,
        },
        {
          url: "https://a0.muscache.com/im/pictures/96967b79-9038-4efb-a187-95c3bf75ff35.jpg?im_w=720",
          previewImage: true,
          spotId: 8,
          // reviewId: 3,
          userId: 3,
        },
        {
          url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-50345540/original/f8e911bb-8021-4edd-aca4-913d6f41fc6f.jpeg?im_w=1200",
          previewImage: true,
          spotId: 9,
          // reviewId: 4,
          userId: 4,
        },
        {
          url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-50345540/original/d998633e-1021-487e-bd65-b8cad5eb0942.jpeg?im_w=1200",
          previewImage: true,
          spotId: 9,
          // reviewId: 4,
          userId: 4,
        },
        {
          url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-50345540/original/76c30fd8-fff1-4e76-ba86-8f5fdf1d23ef.jpeg?im_w=1200",
          previewImage: true,
          spotId: 9,
          // reviewId: 4,
          userId: 4,
        },
        {
          url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-50345540/original/dc1dcc82-e97a-46df-b461-873f36ee8ef6.jpeg?im_w=1200",
          previewImage: true,
          spotId: 9,
          // reviewId: 4,
          userId: 4,
        },
        {
          url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-50345540/original/075f06c7-3f6a-4415-9c31-9d055ff1e433.jpeg?im_w=720",
          previewImage: true,
          spotId: 9,
          // reviewId: 4,
          userId: 4,
        },
        {
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-47870127/original/239c7f2f-470f-424c-9574-c4b212ca4350.jpeg?im_w=720",
          previewImage: true,
          spotId: 10,
          // reviewId: 5,
          userId: 5,
        },
        {
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-47870127/original/60bddf75-35c6-452b-a077-947a5c014ff5.jpeg?im_w=720",
          previewImage: true,
          spotId: 10,
          // reviewId: 5,
          userId: 5,
        },
        {
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-47870127/original/dfb65231-b469-4056-b7fa-f84d9624cc80.jpeg?im_w=720",
          previewImage: true,
          spotId: 10,
          // reviewId: 5,
          userId: 5,
        },
        {
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-47870127/original/7d3dfa98-6276-4239-8aab-d8014226fde0.jpeg?im_w=1200",
          previewImage: true,
          spotId: 10,
          // reviewId: 5,
          userId: 5,
        },
        {
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-47870127/original/3528fb7b-e94f-460f-b37b-27946f1e71e2.jpeg?im_w=720",
          previewImage: true,
          spotId: 10,
          // reviewId: 5,
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
