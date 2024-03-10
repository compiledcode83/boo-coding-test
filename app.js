"use strict";

require('dotenv').config()
const express = require("express");
const { db } = require("./utils/db.util");
const app = express();
const port = process.env.PORT || 3000;

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// set the view engine to ejs
app.set("view engine", "ejs");

// routes
app.use("/profile", require("./routes/profile")());
app.use("/comments", require("./routes/comment")());
app.use("/votes", require("./routes/vote")());
app.use("/accounts", require("./routes/user")());

// start server
const server = app.listen(port);
console.log("Express started. Listening on %s", port);

//Database connect
db.connect();