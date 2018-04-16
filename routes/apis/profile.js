//Module Dependencies
const express = require("express");
const router = express.Router();

// set the routes

// @route   GET api/profile/test
// @desc    Tests profile route
// @access  public
router.get("/test", (req, res) => res.json({ msg: "Profile Works" }));

module.exports = router;
