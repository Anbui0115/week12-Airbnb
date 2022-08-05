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

const validateReview = [
  check("review")
    .exists({ checkFalsy: true })
    .withMessage("Review is required"),
  check("stars").exists({ checkFalsy: true }).withMessage("Rating is required"),
  handleValidationErrors,
];
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
  check("lat").isDecimal().withMessage("Latitude is not valid"),
  check("lng").isDecimal().withMessage("Longitude is not valid"),
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

const validateBooking = [
  check("startDate")
    .exists({ checkFalsy: true })
    .isDate()
    .notEmpty()
    // .custom((value)=>{

    // }
    // )
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

//--------Get all of the Current User's Bookings--------
router.get("/current", requireAuth, restoreUser, async (req, res, next) => {
  const userId = req.user.id;
  console.log("userId------------", userId);
  const bookings = await Booking.findAll({
    where: {
      userId: userId,
    },
    include: {
      model: Spot,
      attributes: [
        "id",
        "ownerId",
        "address",
        "city",
        "state",
        "country",
        "lat",
        "lng",
        "name",
        "price",
        // "previewImage",
      ],
    },
  });
  const img = await Image.findOne({
    where: userId,
  });
  console.log("-----------img", img);
  const result = [];
  for (let booking of bookings) {
    console.log("this is booking ````", booking);
    booking = booking.toJSON();
    booking.Spot.previewImage = img.dataValues.url;
    result.push(booking);
  }
  res.json({ Bookings: result });
});

//---------Edit a Booking-------
router.put(
  "/:bookingId",
  requireAuth,
  restoreUser,
  validateBooking,
  async (req, res, next) => {
    const bookingId = req.params.bookingId;
    const booking = await Booking.findByPk(bookingId);
    if (!booking) {
      res.status(404);
      return res.json({
        message: "Booking couldn't be found",
        statusCode: 404,
      });
    }

    const today = new Date();
    let todayDate = Date.parse(today);
    // console.log("today=============", todayDate);
    const bookingEndDate = Date.parse(booking.endDate);
    // console.log("booking endDate!!!!!!!!!!!!!!!!", bookingEndDate);
    if (todayDate > bookingEndDate) {
      res.status(403);
      return res.json({
        message: "Past bookings can't be modified",
        statusCode: 403,
      });
    }
    let { startDate, endDate } = req.body;
    startDate = new Date(startDate);
    endDate = new Date(endDate);
    if (endDate <= startDate) {
      res.status(400);
      return res.json({
        message: "Validation error",
        statusCode: 400,
        errors: {
          endDate: "endDate cannot come before startDate",
        },
      });
    }

    await booking.update({
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      updatedAt: new Date(),
    });
    await booking.save();
    res.json(booking);
  }
);
//-----------Delete a Booking-----------
router.delete(
  "/:bookingId",
  requireAuth,
  restoreUser,
  async (req, res, next) => {
    let booking = await Booking.findByPk(req.params.bookingId);

    if (!booking) {
      res.status = 404;
      return res.json({
        message: "Booking couldn't be found",
        statusCode: 404,
      });
    }
    let today = new Date();
    let { startDate, endDate } = booking;
    if (today >= startDate && today <= endDate) {
      res.status(403);
      return res.json({
        message: "Bookings that have been started can't be deleted",
        statusCode: 403,
      });
    }

    await booking.destroy();
    await booking.save();

    res.json({
      message: "Successfully deleted.",
      statuscode: 200,
    });
  }
);

module.exports = router;
