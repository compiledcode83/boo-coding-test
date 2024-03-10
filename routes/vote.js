"use strict";
const { db } = require("../utils/db.util");
const express = require("express");
const Vote = require("../models/Vote.model");
const router = express.Router();

module.exports = function () {
  //cast a vote for profile
  router.post("/", async function (req, res, next) {
    const { mbti, enneagram, zodiac, profileId } = req.body;

    const newVote = new Vote({
      mbti: mbti,
      enneagram: enneagram,
      zodiac: zodiac,
      profile: profileId, // Here we use the id of the profile as a relation.
      user: req.user._id, // from the auth system
    });

    const vote = newVote.save();

    if (!vote) {
      res.status(500).send("Failed to vote");
    }

    res.status(200);
  });

  return router;
};
