// backend/routes/api/session.js --------phase 3/4-------
const express = require("express");

const { setTokenCookie, restoreUser } = require("../../utils/auth");
const { User } = require("../../db/models");

const router = express.Router();

//start phase 5
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

//-------------Validate log in---------------
const validateLogin = [
  check("credential")
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage("Please provide a valid email or username."),
  check("password")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a password."),
  handleValidationErrors,
];
//end phase 5
//------------------ Log in------------------
router.post("/", validateLogin, async (req, res, next) => {
  const { credential, password } = req.body;

  const user = await User.login({ credential, password });
  // console.log("user---------", user);
  if (!user) {
    const err = new Error("Invalid credentials");
    err.status = 401;
    err.title = "Invalid credentials";
    err.errors = ['The provided credentials were invalid.'];
    return next(err);
    // res.status(401);
    // res.json({
    //   message: "Invalid credentials",
    //   statusCode: 401,
    // });
  } else {
    await setTokenCookie(res, user);

    return res.json(user);
  }
});

// ----------------Log out------------------phase 4
router.delete("/", (_req, res) => {
  res.clearCookie("token");
  return res.json({ message: "success" });
});

// -------------Restore session user----------------phase 4
router.get("/", restoreUser, (req, res) => {
  const { user } = req;
  if (user) {
    return res.json(user.toSafeObject());
  } else return res.json(null);
});

module.exports = router;
