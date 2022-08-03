const express = require("express");
const {
  setTokenCookie,
  restoreUser,
  requireAuth,
} = require("../../utils/auth");
const { User, Spot, Image, Review, Booking } = require("../../db/models");
const { Op } = require("sequelize");
const router = express.Router();
const { Sequelize } = require("sequelize");
//start phase 5
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

// const {
//   sequelize,
// } = require("../../db/models");
const image = require("../../db/models/image");

const validateSpot = [
  check("address")
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage("Street address is required"),
  check("city").exists({ checkFalsy: true }).withMessage("City is required"),
  check("state").exists({ checkFalsy: true }).withMessage("State is required"),
  check("country")
    .exists({ checkFalsy: true })
    .withMessage("Country is required"),
  check("lat")
    .isDecimal()
    // .custom((value)=>{
    //     if(value <0){
    //         throw new Error("Latitude is not valid")
    //     }
    // }
    // )
    .withMessage("Latitude is not valid"),
  check("lng")
    .isDecimal()
    // .custom((value)=>{
    //     if(value < -180 || value > 180 ){
    //         throw new Error("Longitude is not valid")
    //     }
    // })
    .withMessage("Longitude is not valid"),
  check("name")
    .exists({ checkFalsy: true })
    .isLength({ max: 50 })
    .withMessage("Name must be less than 50 characters"),
  check("description")
    .exists({ checkFalsy: true })
    .withMessage("Description is required"),
  check("price")
    .exists({ checkFalsy: true })
    .withMessage("Price per day is required"),
  handleValidationErrors,
];

//---------Format image output

const imageFormatter = (imgObj) => {
  const formattedImg = {
    id: imgObj.id,
    imageableId: imgObj.spotId,
    url: imgObj.url,
  };
};

//------------------CREATE AN IMAGE FOR A SPOT-----------

router.post("/:spotId/images", requireAuth, async (req, res) => {
  const spot = await Spot.findByPk(req.params.spotId);
  const { url } = req.body;
  // console.log('--------',spot)
  if (!spot) {
    res.status(404);
    res.json({
      message: "Spot couldn't be found",
      statusCode: 404,
    });
  }
  const userId = req.user.id; //???? need authorization
  // const user = await User.scope('currentUser').findByPk(id);
  // console.log('USER__________',userId)
  let ownerId = spot.ownerId;
  // console.log('~~~~~~~~~~~',onwerId)
  if (ownerId !== userId) {
    throw new Error("You don't have permission");
  }
  const checkImg = await Image.findOne({
    where: {
      spotId: req.params.spotId,
    },
  });
  let previewImage = true;
  if (checkImg) {
    previewImage = false;
  }
  const newImg = await Image.create({
    spotId: req.params.spotId,
    url: url,
    previewImage: previewImage,
    userId: userId,
  });
  res.status(200);
  res.json({
    id: newImg.id,
    imageableId: newImg.spotId,
    url: newImg.url,
  });
});
//--------------Get all Spots owned by the Current User---

router.get("/current", async (req, res) => {
  const currentUser = req.user.id;
  const allSpots = await Spot.findAll({
    where: {
      ownerId: currentUser,
    },
  });
  for (let spot of allSpots) {
    // console.log("spotId``````", spot.id);
    const spotReview = await spot.getReviews({
      attributes: [[Sequelize.fn("AVG", Sequelize.col("stars")), "avgRating"]],
    });
    // console.log('spotReview',spotReview)
    let avgRating = spotReview[0].dataValues.avgRating;
    // console.log('avgRating',avgRating)
    spot.dataValues.avgRating = Number(avgRating).toFixed(1); //round to 1 decimal

    const previewImage = await Image.findOne({
      where: {
        [Op.and]: {
          spotId: spot.id,
          previewImage: true,
        },
      },
    });
    // console.log("previewImage", previewImage);
    if (previewImage) {
      spot.dataValues.previewImage = previewImage.dataValues.url;
    }
  }
  res.status(200);
  res.json({ Spots: allSpots });
  return;
});
//----------------Get details of a Spot from an id-------

router.get("/:spotId", async (req, res) => {
  const currentSpot = await Spot.findByPk(req.params.spotId, {
    attributes: {
      include: [
        [Sequelize.literal("User"), "Owner"],
        // [Sequelize.fn('AVG', Sequelize.col('stars')), "avgRating"]
      ],
    },
    include: [
      {
        model: Image,
        attributes: ["id"],
      },
      {
        model: User,
        attributes: ["id"],
      },
    ],
  });

  // console.log("spotId``````", spot.id);
  const spotReview = await spot.getReviews({
    attributes: [[Sequelize.fn("AVG", Sequelize.col("stars")), "avgRating"]],
  });
  // console.log('spotReview',spotReview)
  let avgRating = spotReview[0].dataValues.avgRating;
  // console.log('avgRating',avgRating)
  spot.dataValues.avgRating = Number(avgRating).toFixed(1); //round to 1 decimal

  const previewImage = await Image.findOne({
    where: {
      [Op.and]: {
        spotId: spot.id,
        previewImage: true,
      },
    },
  });
  // console.log("previewImage", previewImage);
  if (previewImage) {
    spot.dataValues.previewImage = previewImage.dataValues.url;
  }

  res.status(200);
  res.json({ Spots: allSpots });
  return;
});


//-------------GET ALL SPOTS-----------------
router.get("/", async (req, res) => {
  //     const reviewCount = await Review.count();
  // console.log(reviewCount,"this is review count")

  //   const allSpots = await Spot.findAll({
  //     attributes: {
  //       include: [
  //         [Sequelize.literal("url"), "previewImage"],
  //         // [Sequelize.fn('AVG', Sequelize.col('stars')), "avgRating"]
  //       ],
  //     },
  //     include: [
  //       {
  //         model: Image,
  //         where: {
  //           previewImage: true,
  //         },
  //         attributes: [],
  //       },
  //       // {
  //       //  model:Review,
  //       //  attributes:[]
  //       // }
  //     ],
  //   });
  //   for (let i = 0; i < allSpots.length; i++) {
  //     let spot = allSpots[i];
  //     let count = await Review.count({
  //       where: {
  //         spotId: spot.dataValues.id,
  //       },
  //     });
  //     let total = await Review.sum("stars", {
  //       where: { spotId: spot.dataValues.id },
  //     });
  //     spot.dataValues.avgRating = total / count;
  //   }

  //   // Spots.forEach(spot =>{
  //   //     spot.avgRating= await Review.findAll({
  //   //         attributes:{
  //   //             include:[
  //   //                 [Sequelize.fn('AVG', Sequelize.col('stars')), "avgRating"]
  //   //             ]
  //   //         }
  //   //     })
  //   //     console.log('--------',spot)
  //   // })

  //   res.status(200);
  //   // Spots.previewImage= 'url example.com'
  //   return res.json({ allSpots });
  const allSpots = await Spot.findAll();
  for (let spot of allSpots) {
    console.log("spotId``````", spot.id);
    const spotReview = await spot.getReviews({
      attributes: [[Sequelize.fn("AVG", Sequelize.col("stars")), "avgRating"]],
    });
    // console.log('spotReview',spotReview)
    let avgRating = spotReview[0].dataValues.avgRating;
    // console.log('avgRating',avgRating)
    spot.dataValues.avgRating = Number(avgRating).toFixed(1); //round to 1 decimal

    const previewImage = await Image.findOne({
      where: {
        [Op.and]: {
          spotId: spot.id,
          previewImage: true,
        },
      },
    });
    // console.log("previewImage", previewImage);
    if (previewImage) {
      spot.dataValues.previewImage = previewImage.dataValues.url;
    }
  }
  res.status(200);
  res.json({ Spots: allSpots });
  return;
});

//------------------CREATE NEW SPOT---------------
router.post("/", requireAuth, validateSpot, async (req, res) => {
  let { address, city, state, country, lat, lng, name, description, price } =
    req.body;
  const newSpot = await Spot.create({
    ownerId: req.user.id,
    address,
    city,
    state,
    country,
    lat,
    lng,
    name,
    description,
    price,
  });
  res.status(201);
  res.json(newSpot);
});


module.exports = router;
