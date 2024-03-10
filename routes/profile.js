"use strict";
const { db } = require("../utils/db.util");
const Profile = require("../models/Profile.model");
const express = require("express");
const router = express.Router();

module.exports = function () {
  router.post("/", async function (req, res, next) {
    const {
      name,
      description,
      mbti,
      enneagram,
      variant,
      tritype,
      socionics,
      sloan,
      psyche,
    } = req.body;

    const newProfile = new Profile({
      name: name,
      description: description,
      mbti: mbti,
      enneagram: enneagram,
      variant: variant,
      tritype: tritype,
      socionics: socionics,
      sloan: sloan,
      psyche: psyche,
      user: req.user._id,
    });
    const profile = newProfile.save();

    if (!profile) {
      res.status(500).send("Failed to create a new profile");
    }

    res.render("profile_template", {
      profile: profile,
    });
  });

  // Return single profile based on ID
  router.get("/:profileId", async function (req, res, next) {
    const profileId = req.params.profileId;

    const profile = await Profile.findById(profileId);

    if (!profile) {
      res.status(500).send("profile not available");
    }

    res.render("profile_template", {
      profile: profile,
    });
  });

  // Returns all profiles
  router.get("/", async function (req, res, next) {
    const profiles = await Profile.find({});
    if (!profiles) {
      res.status(500).send("Could not fecth profiles");
    }
    res.send(profiles);
  });

  return router;
};
