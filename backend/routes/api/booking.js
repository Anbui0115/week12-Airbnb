const express = require("express");
const {
  setTokenCookie,
  restoreUser,
  requireAuth,
  authenticate,
} = require("../../utils/auth");
const { User, Spot, Image, Review, Booking } = require("../../db/models");
const { Op, json } = require("sequelize");
const router = express.Router();
// const { Sequelize } = require("sequelize");
//start phase 5
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const user = require("../../db/models/user");

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
//--------Get booking by spot id--------
// router.get("/:spotId", requireAuth, async (req, res) => {
router.get("/auth/:spotId", requireAuth, async (req, res) => {
  const spot = await Spot.findByPk(req.params.spotId);

  if (!spot) {
    return res.status(404).json({
      message: "Spot couldn't be found",
      statusCode: 404,
    });
  }

  let allBookings = await Booking.scope(["nonOwner"]).findAll({
    where: {
      spotId: spot.id,
    },
  });
  if (allBookings.length < 0) {
    return res.json({
      message: "There are no booking for this spot",
      statusCode: 204, //204 No Content
    });
  }

  if (spot.ownerId === req.user.id) {
    allBookings = await Booking.findAll({
      include: {
        model: User,
        attributes: ["id", "firstName", "lastName"],
      },
      where: {
        spotId: spot.id,
      },
    });
  }
  res.json({
    Bookings: allBookings,
  });
});

//--------Get all of the Current User's Bookings--------
// router.get("/current", requireAuth, restoreUser, async (req, res, next) => {
router.get("/auth", requireAuth, async (req, res) => {
  const userId = req.user.id;
  // console.log("userId------------", userId);
  const bookings = await Booking.findAll({
    where: {
      userId: userId,
    },
    include: {
      model: Spot,
    },
  });

  let result = [];

  for (let booking of bookings) {
    // console.log("this is booking ``````````````", booking);
    let resultBooking = { ...booking.toJSON() };
    let spot = resultBooking.Spot;
    // console.log("this is spot ``````````````", spot);
    let user = await User.findByPk(spot.ownerId);
    // console.log("this is user ``````````````", user);
    user = user.toJSON();

    spot.Owner = user;
    result.push(resultBooking);
  }
  result = result.sort((a, b) => new Date(b.startDate) - new Date(a.startDate));
  //result is an array
  res.json({ Bookings: result });
});
//---------Create a Booking-------
// router.post("/:spotId", requireAuth, async (req, res, next) => {
router.post("/auth/:spotId", requireAuth, async (req, res, next) => {
  const spot = await Spot.findByPk(req.params.spotId);
  if (!spot) {
    return res.status(404).json({
      message: "Spot couldn't be found",
      statusCode: 404,
    });
  }

  const err = {
    message: "Validation error",
    statusCode: 400,
    errors: {},
  };
  const { startDate, endDate } = req.body;
  if (!startDate) err.errors.startDate = "Start date is required";
  if (!endDate) err.errors.endDate = "End date is required";
  if (startDate > endDate)
    err.errors.endDate = "End Date cannot come before start date";
  if (!endDate || !startDate || startDate > endDate) {
    return res.status(400).json(err);
  }

  const date1 = new Date(endDate).getTime();
  const date2 = new Date().getTime();
  if (date1 < date2) {
    return res.status(400).json({
      message: "Can't book a spot in the past",
      statusCode: 400,
    });
  }

  const allDates = await Booking.findAll({
    where: {
      spotId: spot.id,
    },
    raw: true,
    attributes: ["startDate", "endDate"],
  });

  err.message = "Sorry, this spot is already booked for the specified dates";
  err.errors = {};
  for (let dates of allDates) {
    let start = dates.startDate;
    let end = dates.endDate;
    let formattedStart = new Date(start).getTime();
    let formattedEnd = new Date(end).getTime();
    let formattedStartDate = new Date(startDate).getTime();
    let formattedEndDate = new Date(endDate).getTime();

    if (
      formattedStartDate >= formattedStart &&
      formattedStartDate <= formattedEnd
    ) {
      err.errors.startDate = "Start date conflicts with an existing booking";
    }
    if (
      formattedEndDate >= formattedStart &&
      formattedEndDate <= formattedEnd
    ) {
      err.errors.endDate = "End date conflicts with an existing booking";
    }
  }

  const booking = await Booking.create({
    spotId: spot.id,
    userId: req.user.id,
    startDate,
    endDate,
  });
  res.json(booking);
});

//---------Edit a Booking-------
// router.put(
//   "/:bookingId",
//   requireAuth,
//   restoreUser,
//   validateBooking,
//   async (req, res, next) => {
router.put("/auth/:bookingId", requireAuth, async (req, res, next) => {
  const bookingId = req.params.bookingId;
  const booking = await Booking.findByPk(bookingId);
  if (!booking) {
    res.status(404);
    return res.json({
      message: "Booking couldn't be found",
      statusCode: 404,
    });
  }
  if (booking.userId !== req.user.id) {
    return res.status(403).json({
      message: "Forbidden",
      statusCode: 403,
    });
  }

  const { spotId } = booking.toJSON();
  const allDates = await Booking.findAll({
    attributes: ["startDate", "endDate"],
    raw: true,
    where: {
      spotId,
    },
  });

  const err = {
    message: "Validation error",
    statusCode: 400,
    errors: {},
  };
  const { startDate, endDate } = req.body;

  if (new Date(booking.endDate) < new Date()) {
    return res.status(400).json({
      message: "Past bookings can't be modified",
      statusCode: 400,
    });
  }
  if (!startDate) err.errors.startDate = "Start date is required";
  if (!endDate) err.errors.endDate = "End date is required";
  if (startDate > endDate)
    err.errors.endDate = "endDate cannot come before startDate";

  if (!startDate || !endDate || startDate > endDate) {
    return res.status(400).json(err);
  }
  if (new Date(endDate) < new Date()) {
    return res.status(400).json({
      message: "Cannot set bookings in the past",
      statusCode: 400,
    });
  }

  err.message = "Sorry, this spot is already booked for the specified dates";
  err.statusCode = 403;
  err.errors = {};
  for (let dates of allDates) {
    let start = dates.startDate;
    let end = dates.endDate;
    if (startDate >= start && startDate <= end) {
      err.errors.startDate = "Start date conflicts with an existing booking";
    }
    if (endDate >= start && endDate <= end) {
      err.errors.endDate = "End date conflicts with an existing booking";
    }
  }

  if ("endDate" in err.errors || "startDate" in err.errors) {
    return res.status(403).json(err);
  }

  booking.startDate = startDate;
  booking.endDate = endDate;

  await booking.save();

  res.json(booking);
});
//-----------Delete a Booking-----------
// router.delete(
//   "/:bookingId",
//   requireAuth,
//   restoreUser,
//   async (req, res, next) => {
router.delete("/auth/:bookingId", requireAuth, async (req, res) => {
  let booking = await Booking.findByPk(req.params.bookingId);

  if (!booking) {
    res.status = 404;
    return res.json({
      message: "Booking couldn't be found",
      statusCode: 404,
    });
  }
  if (booking.userId !== req.user.id) {
    return res.status(403).json({
      message: "Forbidden",
      statusCode: 403,
    });
  }
  const { startDate } = booking.toJSON();

  if (new Date(startDate).getTime() < new Date().getTime()) {
    return res.status(400).json({
      message: "Bookings that have been started can't be deleted",
      statusCode: 400,
    });
  }

  await booking.destroy();
  await booking.save();

  res.status(200).json({
    message: "Successfully deleted",
    statusCode: 200,
  });
});

module.exports = router;
