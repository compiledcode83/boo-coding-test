"use strict";
const { db } = require("../utils/db.util");
const express = require("express");
const User = require("../models/User.model");
const router = express.Router();

module.exports = function () {
  // create a user account.
  router.post("/", async function (req, res, next) {
    const name = req.body;

    const newUser = new User({
      name: name,
    });

    const user = newUser.save();

    if (!user) {
      res.status(500).send("Failed to create account");
    }

    res.status(200);
  });

  return router;
};
