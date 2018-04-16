//Module Dependencies
const express = require("express");
const router = express.Router();

// set the routes

// @route   GET api/users/test
// @desc    Tests users route
// @access  public
router.get("/test", (req, res) => res.json({ msg: "Users Works" }));

module.exports = router;
