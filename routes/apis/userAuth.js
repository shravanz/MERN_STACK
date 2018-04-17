//Module Dependencies
const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwtKey = require("../../config/keys").jwtSecret;

//Importing the user Model
const User = require("../../model/User");
// set the routes

// @route   GET api/users/test
// @desc    Tests users route
// @access  public
router.get("/test", (req, res) => res.json({ msg: "Users Works" }));

// @route   GET api/users/register
// @desc    Register users route
// @access  public
router.post("/register", (req, res) => {
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ email: "Email Alredy exists" });
    } else {
      //gravatar middleware
      const avatar = gravatar.url(req.body.email, {
        s: "200", //picture size
        r: "pg", //rating
        d: "mm" //default picture if no image is there
      });

      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        avatar: avatar,
        password: req.body.password
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

// @route   GET api/users/login
// @desc    User Login and returning Token
// @access  public
router.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  //Find that user by email
  User.findOne({ email }).then(user => {
    //check for user
    if (!user) {
      return res.status(404).json({ msg: "User not Found" });
    }
    //check the password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        //User Matched

        //creating JWT payload
        const payload = { id: user._id, name: user.name, avatar: user.avatar };

        //sign Token
        jwt.sign(payload, jwtKey, { expiresIn: 3600 }, (err, token) => {
          res.json({ msg: "Success", token: "Bearer " + token });
        });
      } else {
        return res.status(400).json({ msg: "Wrong Password" });
      }
    });
  });
});

module.exports = router;
