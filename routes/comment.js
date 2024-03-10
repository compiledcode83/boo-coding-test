"use strict";
const { db } = require("../utils/db.util");
const { Comment } = require("../models/comment.model");
const express = require("express");
const router = express.Router();

module.exports = function () {
  // post comment.
  router.post("/", async function (req, res, next) {
    const { my_comment, title, mbti, enneagram, zodiac, profileId } = req.body;

    const newComment = new Comment({
      comment: my_comment,
      title: title,
      profile: profileId,
      user: req.user._id, // from auth system
    });
    const comment = await newComment.save();

    if (!comment) {
      res.status(500).send("could not comment");
    }

    res.status(201).send(comment);
  });

  // Lists all comments for the particular profile.
  router.get("/:profileId", async function (req, res, next) {
    const comments = Comment.find({ profile: req.params.profileId });

    if (!comments) {
      res.status(500).send("Could not fetch comments");
    }
    res.status(200).send(comments);
  });

  //filter comment by personality systems.
  router.get("/:profileId/:personality", async function (req, res, next) {
    const person = req.params.personality;

    const comments = Comment.find({ profile: req.params.profileId }).sort({
      person,
    });

    if (!comments) {
      res.status(500);
    }

    res.send(200).send(comments);
  });

  //sort comment. Recent or no of likes
  router.get("/:profileId/sort", async function (req, res, next) {
    const profile_id = req.params.profileId;
    if (req.query == "recent") {
      const comments = Comment.find({ profile: profile_id }).sort({
        _id: -1,
      });
      if (!comments) {
        res.status(505).send("could not find comments");
      }
      res.status(200).send(comments);
    } else {
      const comments = Comment.find({ profile: profile_id }).sort({
        likes: "desc",
      });
      if (!comments) {
        res.status(500).send("could not find comments");
      }
      res.status(200).send(comments);
    }
  });

  //like comment.
  router.get("/:comment/like", async function (req, res, next) {
    const comment_id = req.params.comment;

    const comment = await Comment.findById(comment_id);
    await Comment.findByIdAndUpdate(
      { _id: comment_id },
      { likes: comment.likes + 1 }
    );

    if (!comment) {
      res.status(500).send("failed to like");
    }

    res.status(200);
  });

  //unlike comment.
  router.get("/:comment/unlike", async function (req, res, next) {
    const comment_id = req.params.comment;

    const comment = await Comment.findById(comment_id);
    await Comment.findByIdAndUpdate(
      { _id: comment_id },
      { likes: comment.likes - 1 }
    );

    if (!comment) {
      res.status(500).send("failed to un-like");
    }

    res.status(200);
  });
  return router;
};
