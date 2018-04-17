//Module Dependencies
const express = require("express");
const bodyParser = require("body-parser");
const usersAuth = require("./routes/apis/userAuth");
const profile = require("./routes/apis/profile");
const posts = require("./routes/apis/posts");

const app = express();

//BodyParser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const mongoose = require("mongoose");

//DB-Config
const db = require("./config/keys").mongoURI;

//connect to mongodb with mongoose
mongoose
  .connect(db)
  .then(() => console.log("MongoDb Connected"))
  .catch(err => console.log(err));

//A Temporary Route
app.get("/", (req, res) => res.send(`hello lets get started with MERN_STACK`));

// Use Routes
app.use("/api/users", usersAuth);
app.use("/api/profile", profile);
app.use("/api/posts", posts);

//Setting up the Port
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`The Server started on ${port}`));
