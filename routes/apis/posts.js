//Module Dependencies
const express = require("express");
const router = express.Router();

// set the routes

// @route   GET api/posts/test
// @desc    Tests posts route
// @access  public
router.get("/test", (req, res) => res.json({ msg: "posts Works" }));

module.exports = router;
