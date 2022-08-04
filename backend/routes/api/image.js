const express = require("express");
const { setTokenCookie, requireAuth, restoreUser } = require("../../utils/auth");
const { Spot, Image, User, Review, Booking } = require("../../db/models");
const { Op } = require("sequelize");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const router = express.Router();

// ----------------Delete an Image--------------
router.delete("/:imageId", requireAuth,restoreUser, async (req, res, next) => {
  let image = await Image.findByPk(req.params.imageId);

  if (!image) {
   res.status = 404;
    return res.json({
      message: "Image couldn't be found",
      statusCode: 404,
    });
  }

  await image.destroy();
  await image.save();

  res.json({
    message: "Successfully deleted.",
    statuscode: 200,
  });
});
module.exports = router;
