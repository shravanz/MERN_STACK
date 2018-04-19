//Module Dependencies
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

//Load Profile Model
const Profile = require("../../model/Profile");
//Load User Model
const User = require("../../model/User");

// set the routes

// @route   GET api/profile/test
// @desc    Tests profile route
// @access  public
router.get("/test", (req, res) => res.json({ msg: "Profile Works" }));

// @route   GET api/profile
// @desc    Get Current User Profile
// @access  Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    Profile.findOne({ user: req.user._id })
      .then(profile => {
        if (!profile) {
          errors.noprofile = "There is no profile for this user";
          return res.status(404).json(errors);
        }
        res.json(profile);
      })
      .catch(err => {
        return res.status(404).json(err);
      });
  }
);

module.exports = router;
