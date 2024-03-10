const mongoose = require("mongoose");

const VoteSchema = new mongoose.Schema(
  {
    mbti: {
      type: String,
    },
    enneagram: {
      type: String,
    },
    zodiac: { type: String },
    profile: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Profile",
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Vote = mongoose.models.Vote || mongoose.model("Vote", VoteSchema);

module.exports = Vote;
