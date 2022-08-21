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

router.post(
  "/:reviewId/images",
  requireAuth,
  restoreUser,
  async (req, res, next) => {
    const reviewId = req.params.reviewId;
    // console.log('reviewId```````````````````````',reviewId)
    const review = await Review.findByPk(reviewId);
    // console.log("review--------", review);
    if (!review) {
      res.status(404);
      res.json({
        message: "Review couldn't be found",
        statusCode: 404,
      });
    }
    const totalImages = await Image.findAll({
      where: {
        spotId: review.spotId,
      },
    });
    if (totalImages.length >= 10) {
      res.status(403);
      res.json({
        message: "Maximum number of images for this resource was reached",
        statusCode: 403,
      });
    }
    let previewImage = false;
    if (req.body.previewImage) {
      previewImage = req.body.previewImage;
    }
    const newImg = await Image.create({
      url: req.body.url,
      previewImage: previewImage,
      spotId: review.spotId,
      reviewId: reviewId,
      userId: req.user.id,
    });
    res.json({
      id: newImg.id,
      //   previewImage,// previewImage:true (based on the req.body)
      imageableId: newImg.reviewId,
      url: newImg.url,
    });
  }
);
//------------------Get all Reviews of the Current User----
router.get("/current", requireAuth, restoreUser, async (req, res, next) => {
  const currentReviews = await Review.findAll({
    where: {
      userId: req.user.id,
    },
  });
  for (let i = 0; i < currentReviews.length; i++) {
    let review = currentReviews[i];
    // console.log("review``````````````````", review);
    let spot = await review.getSpot();
    let images = await review.getImages({
      attributes: ["id", ["reviewId", "imageableId"], "url"],
    });
    let owner = await review.getUser({
      attributes: ["id", "firstName", "lastName"],
    });
    review.dataValues.Spot = spot.toJSON();
    review.dataValues.Images = images;
    review.dataValues.User = owner.toJSON();
  }
  res.json({ Reviews: currentReviews });
});

//------------- Edit a Review------
router.put(
  "/:reviewId",
  restoreUser,
  requireAuth,
  validateReview,
  async (req, res, next) => {
    const { review, stars } = req.body;
    const thisReview = await Review.findByPk(req.params.reviewId);
    if (!thisReview) {
      return res.json({
        message: "Review couldn't be found",
        statusCode: 404,
      });
    }
    const updateReview = await thisReview.update({
      review,
      stars,
      updatedAt: new Date(),
    });
    res.json(updateReview);
  }
);

//-----------Delete a Review---------
router.delete(
  "/:reviewId",
  requireAuth,
  restoreUser,
  async (req, res, next) => {
    const review = await Review.findByPk(req.params.reviewId);
    if (!review) {
      res.status(404);
      return res.json({
        message: "Review couldn't be found",
        statusCode: 404,
      });
    }
    await review.destroy();
    res.json({
      message: "Successfully deleted",
      statusCode: 200,
    });
  }
);
module.exports = router;
