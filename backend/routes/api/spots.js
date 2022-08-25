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

// {
//       "message": "Validation error",
//       "statusCode": 400,
//       "errors": {
//         "review": "Review text is required",
//         "stars": "Stars must be an integer from 1 to 5",
//       }
//     }

const validateReview = [
  check("review")
    .exists({ checkFalsy: true })
    .withMessage("Review text is required"),
  check("stars")
    .exists({ checkFalsy: true })
    .withMessage("Stars must be an integer from 1 to 5"),
  handleValidationErrors,
];

const validateBooking = [
  check("startDate")
    .exists({ checkFalsy: true })
    .isDate()
    .notEmpty()
    .withMessage(
      "startDate cannot be empty. Cannot be greater than endDate. Format is YYYY-MM-DD"
    ),
  check("endDate")
    .exists({ checkFalsy: true })
    .isDate()
    .notEmpty()
    .withMessage("endDate cannot be empty. Format is YYYY-MM-DD"),
  handleValidationErrors,
];
const validateQuery = [
  check("page")
    .isInt({ min: 0 }, { max: 10 })
    .optional()
    .withMessage("Page must be greater than or equal to 0"),
  check("size")
    .isInt({ min: 0 }, { max: 20 })
    .optional()
    .withMessage("Size must be greater than or equal to 0"),
  check("minLat")
    .isDecimal()
    .optional()
    .withMessage("Minimum latitude is invalid"),
  check("maxLat")
    .isDecimal()
    .optional()
    .withMessage("Maximum latitude is invalid"),
  check("minLng")
    .isDecimal()
    .optional()
    .withMessage("Minimum longitude is invalid"),
  check("maxLng")
    .isDecimal()
    .optional()
    .withMessage("Maximum longitude is invalid"),
  check("minPrice")
    .isDecimal({ min: 0 })
    .optional()
    .withMessage("Minimum price must be greater than or equal to 0"),
  check("maxPrice")
    .isDecimal({ min: 0 })
    .optional()
    .withMessage("Maximum price must be greater than or equal to 0"),
];

//---------Format image output helper ------

// const imageFormatter = (imgObj) => {
//   const formattedImg = {
//     id: imgObj.id,
//     imageableId: imgObj.spotId,
//     url: imgObj.url,
//   };
// };
//---------Spot found helper ------need to see how to use it?
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
  // validateReview,
  async (req, res, next) => {
    const spot = await Spot.findByPk(req.params.spotId);
    if (!spot) {
      res.status(404);
      return res.json({ message: "Spot couldn't be found", statusCode: 404 });
    }

    if (!req.body.review || !req.body.stars) {
      res.status(400);
      return res.json({
        message: "Validation error",
        statusCode: 400,
        errors: {
          review: "Review text is required",
          stars: "Stars must be an integer from 1 to 5",
        },
      });
    }
    const totalReviews = await Review.findAll({
      where: {
        [Op.and]: [{ userId: req.user.id }, { spotId: req.params.spotId }],
      },
    });
    if (totalReviews.length >= 1) {
      res.status(403);
      return res.json({
        message: "User already has a review for this spot",
        statusCode: 403,
      });
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
  const userId = req.user.id; // need authorization??
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
router.put("/:spotId", requireAuth, validateSpot, async (req, res, next) => {
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

  const editedSpot = await spot.update({
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
  res.json(editedSpot);
});

//---------------DELETE A SPOT---------------
router.delete("/:spotId", requireAuth, restoreUser, async (req, res) => {
  const { spotId } = req.params;
  const currentSpot = await Spot.findByPk(spotId);

  // console.log('current spot',currentSpot)
  if (!currentSpot) {
    res.status(404);
    return res.json({
      message: "Spot couldn't be found",
      statusCode: 404,
    });
  }
  // if (currentSpot.ownerId === req.user.id) {
  await currentSpot.destroy();
  res.json({
    message: "Successfully deleted",
    statusCode: 200,
  });
  // }
});

//----------------Get details of a Spot from an id-------

router.get("/:spotId", async (req, res, next) => {
  const currentSpot = await Spot.findByPk(req.params.spotId, {
    include: [
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
  console.log("THIS IS CURRENT SPOT in BACKEND", currentSpot);
  if (!currentSpot) {
    res.json({
      message: "Spot couldn't be found",
      statusCode: 404,
    });
  }
  const countReview = await Spot.findByPk(req.params.spotId, {
    include: {
      model: Review,
      attributes: [],
    },
    attributes: [
      [Sequelize.fn("COUNT", Sequelize.col("review")), "numReviews"],
      [Sequelize.fn("AVG", Sequelize.col("stars")), "avgStarRating"],
    ],
    raw: true,
  });
  let currentSpotJSON = currentSpot.toJSON();
  currentSpotJSON.numReviews = countReview.numReviews;
  const rating = countReview.avgStarRating;
  currentSpotJSON.avgStarRating = Number(rating).toFixed(1);
  res.json(currentSpotJSON);

  //Number(avgRating).toFixed(1); //round to 1 decimal
});

//-------------GET ALL SPOTS--------------NOW ADD QUERY AND PAGINATION
router.get("/", validateQuery, async (req, res, next) => {
  let { page, size, minLat, maxLat, minLng, maxLng, minPrice, maxPrice } =
    req.query;
  let pagination = { options: [] };

  page = parseInt(page);
  size = parseInt(size);

  if (Number.isNaN(page)) {
    page = 1;
  }
  if (Number.isNaN(size)) {
    size = 20;
  }

  pagination.limit = size;
  pagination.offset = size * (page - 1);

  //push in options arr
  if (minLat) {
    pagination.options.push({
      lat: { [Op.gte]: Number(minLat) },
    });
  }

  if (maxLat) {
    pagination.options.push({
      lat: { [Op.lte]: Number(maxLat) },
    });
  }

  if (minLng) {
    pagination.options.push({
      lng: { [Op.gte]: Number(minLng) },
    });
  }

  if (maxLng) {
    pagination.options.push({
      lat: { [Op.lte]: Number(maxLng) },
    });
  }

  if (minPrice) {
    pagination.options.push({
      price: { [Op.gte]: Number(minPrice) },
    });
  }

  if (maxPrice) {
    pagination.options.push({
      price: { [Op.lte]: Number(maxPrice) },
    });
  }

  const allSpots = await Spot.findAll({
    where: {
      [Op.and]: pagination.options,
    },
    limit: pagination.limit,
    offset: pagination.offset,
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
  // res.json({ Spots: allSpots });
  res.json({
    Spots: allSpots,//allSpots is an array
    page,
    size,
  });
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

//------------Create a Booking from a Spot based on the Spot's id---
router.post(
  "/:spotId/bookings",
  requireAuth,
  restoreUser,
  validateBooking,
  async (req, res, next) => {
    const spotId = parseInt(req.params.spotId);
    const userId = parseInt(req.user.id);
    // console.log("spotId~~~~~~~~~~~~~~~~~~~", spotId); //3
    // console.log("userId------------------", userId); //1
    const spot = await Spot.findByPk(spotId);
    if (!spot) {
      res.status(404);
      return res.json({
        message: "Spot couldn't be found",
        statusCode: 404,
      });
    }
    const bookings = await Booking.findAll({
      where: {
        spotId: spotId,
        [Op.and]: [
          {
            startDate: { [Op.lte]: req.body.startDate },
          },
          {
            endDate: { [Op.gte]: req.body.endDate },
          },
        ],
      },
    });
    if (bookings.length >= 1) {
      res.status(403);
      return res.json({
        message: "Sorry, this spot is already booked for the specified dates",
        statusCode: 403,
        errors: {
          startDate: "Start date conflicts with an existing booking",
          endDate: "End date conflicts with an existing booking",
        },
      });
    }
    const newBooking = await Booking.create({
      spotId: spotId,
      userId: userId,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      // updatedAt: new Date(),
    });
    // console.log('newbooking``````````````',newBooking)
    // await newBooking.save();
    res.json(newBooking);
  }
);

//--------Get all Bookings for a Spot based on the Spot's id---
router.get(
  "/:spotId/bookings",
  requireAuth,
  restoreUser,
  async (req, res, next) => {
    const spotId = req.params.spotId;
    const spot = await Spot.findByPk(spotId);
    if (!spot) {
      res.status(404);
      return res.json({
        message: "Spot couldn't be found",
        statusCode: 404,
      });
    }
    // if(spot.ownerId === req.user.id){
    const bookings = await Booking.findAll({
      include: { model: User, attributes: ["id", "firstName", "lastName"] },
      where: {
        spotId: spotId,
      },
    });
    // }else {
    //   const
    // }
    res.json({ bookings });
  }
);
module.exports = router;
