const express = require("express");
const {
  setTokenCookie,
  requireAuth,
  restoreUser,
} = require("../../utils/auth");
const { Spot, Image, User, Review, Booking } = require("../../db/models");
const { Op } = require("sequelize");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const router = express.Router();

// ----------------Delete an Image--------------
router.delete("/:imageId", requireAuth, restoreUser, async (req, res, next) => {
  let image = await Image.findByPk(req.params.imageId);

  if (!image) {
    const err = new Error("Forbidden");
    err.message = "Image couldn't be found";
    err.status = 404;
    next(err);
  }
  if (image.userId === req.user.id) {
    await image.destroy();
    res.json({
      message: "Successfully deleted",
      statusCode: 200,
    });
  } else {
    const err = new Error("Forbidden");
    err.message = "Forbidden";
    err.status = 403;
    next(err);
  }
});

module.exports = router;
