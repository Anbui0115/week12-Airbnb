const express = require("express");
const {
  setTokenCookie,
  restoreUser,
  requireAuth,
  authenticate,
} = require("../../utils/auth");
const { User, Spot, Image, Review, Booking } = require("../../db/models");
const { Op } = require("sequelize");
const router = express.Router();
const { Sequelize } = require("sequelize");
//start phase 5
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

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

const validateReview = [
  check("review")
    .exists({ checkFalsy: true })
    .withMessage("Review is required"),
  check("stars").exists({ checkFalsy: true }).withMessage("Rating is required"),
  handleValidationErrors,
];

//---------Format image output helper ------

const imageFormatter = (imgObj) => {
  const formattedImg = {
    id: imgObj.id,
    imageableId: imgObj.spotId,
    url: imgObj.url,
  };
};
//---------Spot found helper ------need to see how to use it
// const foundSpot = function (spot, next) {
//   if (!spot) {
//     const err = new Error("Spot couldn't be found");
//     err.status = 404;
//     err.message = "Spot couldn't be found";
//   }
// return true
// };
//-------------CREATE A REVIEW FOR A SPOT------------
router.post(
  "/:spotId/reviews",
  requireAuth,
  validateReview,
  async (req, res, next) => {
    const spot = await Spot.findByPk(req.params.spotId);
    if (!spot) {
      const err = new Error("Spot couldn't be found");
      err.errors = [`Spot with ID ${req.params.spotId} does not exist`];
      return next(err);
    }
    const totalReviews = await Review.findAll({
      where: {
        [Op.and]: [{ userId: req.user.id }, { spotId: req.params.spotId }],
      },
    });
    if (totalReviews.length >= 1) {
      const err = new Error("User already has a review for this spot");
      err.status = 403;
      err.errors = [
        `Current User already made a review for this spot with ID ${req.params.spotId}`,
      ];
    }
    const newReview = await Review.create({
      userId: req.user.id,
      spotId: req.params.spotId,
      review: req.body.review,
      stars: req.body.stars,
    });
    res.status(201);
    res.json(newReview);
  }
);
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

//------------EDIT A SPOT----------
router.put("/:spotId", requireAuth, async (req, res) => {
  const spotId = req.params.spotId;
  const {
    address,
    city,
    state,
    country,
    lat,
    lng,
    name,
    description,
    price,
    previewImage,
  } = req.body;
  const spot = await Spot.findByPk(spotId);

  if (!spot) {
    return res.status(404).json({
      message: "Spot couldn't be found",
      statusCode: 404,
    });
  }

  const error = {
    message: "Validation Error",
    statusCode: 400,
    errors: {},
  };

  if (!address) error.errors.address = "Street address is required";
  if (!city) error.errors.city = "City is required";
  if (!state) error.errors.state = "State is required";
  if (!country) error.errors.country = "Country is required";
  if (!lat) error.errors.lat = "Latitude is not valid";
  if (!lng) error.errors.lng = "Longitude is not valid";
  if (!name) error.errors.name = "Name must be less than 50 characters";
  if (!description) error.errors.description = "Description is required";
  if (!price) error.errors.price = "Price per day is required";

  if (
    !address ||
    !city ||
    !state ||
    !country ||
    !lat ||
    !lng ||
    !name ||
    !description ||
    !price
  ) {
    res.statusCode = 400;
    return res.json(error);
  }

  await spot.update({
    address,
    city,
    state,
    country,
    lat,
    lng,
    name,
    description,
    price,
    previewImage,
  });
  res.json(spot);
});

//---------------DELETE A SPOT---------------
router.delete("/:spotId", requireAuth, async (req, res) => {
  const { spotId } = req.params;
  const currentSpot = await Spot.findByPk(spotId);

  // console.log('current spot',currentSpot)
  if (!currentSpot) {
    res.status(404);
    return res.json({
      message: "Spot couldn't be found",
      statusCode: 404,
    });
  } else {
    await currentSpot.destroy();
    res.json({
      message: "Successfully deleted",
      statusCode: 200,
    });
  }
});
//----------------Get details of a Spot from an id-------

router.get("/:spotId", async (req, res, next) => {
  const currentSpot = await Spot.findByPk(req.params.spotId, {
    // attributes: {
    //   include: [
    //     // [Sequelize.literal("User"), "Owner"],
    //     [Sequelize.fn('AVG', Sequelize.col('stars')), "avgRating"]
    //   ],
    // },
    include: [
      // {
      //   model: Review,
      //   attributes: {
      //     include: [
      //       [Sequelize.fn("COUNT", Sequelize.col("review")), "numReviews"],
      //       [Sequelize.fn("AVG", Sequelize.col("stars")), "avgStarRating"],
      //     ],
      //   },
      // },
      {
        model: Image,
        attributes: ["id", ["spotId", "imageableId"], "url"],
      },
      {
        model: User,
        as: "Owner",
        attributes: ["id", "firstName", "lastName"],
      },
    ],
  });
  if (!currentSpot) {
    res.json({
      // "message": "Spot couldn't be found",
      // "statusCode": 404
      message: "Spot couldn't be found",
      statusCode: 404,
    });
  }
  const countReview = await Spot.findByPk(req.params.spotId, {
    include: {
      model: Review,
      attributes: [],
    },
    attributes: {
      include: [
        [Sequelize.fn("COUNT", Sequelize.col("review")), "numReviews"],
        [Sequelize.fn("AVG", Sequelize.col("stars")), "avgStarRating"],
      ],
    },
    raw: true,
  });
  let currentSpotJSON = currentSpot.toJSON();
  currentSpotJSON.numReviews = countReview.numReviews;
  currentSpotJSON.avgStarRating = countReview.avgStarRating;
  res.json(currentSpotJSON);

  // console.log("spotId``````", spot.id);
  // const spotReview = await spot.getReviews({
  //   attributes: [[Sequelize.fn("AVG", Sequelize.col("stars")), "avgRating"]],
  // });
  // // console.log('spotReview',spotReview)
  // let avgRating = spotReview[0].dataValues.avgRating;
  // // console.log('avgRating',avgRating)
  // spot.dataValues.avgRating = Number(avgRating).toFixed(1); //round to 1 decimal

  // const previewImage = await Image.findOne({
  //   where: {
  //     [Op.and]: {
  //       spotId: spot.id,
  //       previewImage: true,
  //     },
  //   },
  // });
  // // console.log("previewImage", previewImage);
  // if (previewImage) {
  //   spot.dataValues.previewImage = previewImage.dataValues.url;
  // }

  // res.status(200);
  // res.json({ Spots: allSpots });
  // return;
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

//------------- Get all Reviews by a Spot's id------
router.get("/:spotId/reviews", restoreUser, async (req, res, next) => {
  const spotId = req.params.spotId;
  const spot = await Spot.findByPk(spotId);
  if (!spot) {
    return res.json({
      message: "Spot couldn't be found",
      statusCode: 404,
    });
  }
  const reviews = await Review.findAll({
    where: {
      spotId: spotId,
    },
    include: [
      { model: User, attributes: ["id", "firstName", "lastName"] },
      { model: Image, attributes: ["id", ["spotId", "imageableId"], "url"] },
    ],
  });
  const images = await Image.findAll({
    where: {
      spotId: spotId,
    },
  });
  // for (let review of reviews) {
  //   review.Images = images;
  // }
  res.json({ Reviews: reviews });
});

module.exports = router;
