const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    mbti: { type: String, required: true },
    enneagram: { type: String, required: true },
    variant: { type: String, required: true },
    tritype: { type: Number, required: true },
    socionics: { type: String, required: true },
    sloan: { type: String, required: true },
    psyche: { type: String, required: true },
    image: {
      type: String,
      default: "https://soulverse.boo.world/images/1.png",
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

const Profile =
  mongoose.models.Profile || mongoose.model("Profile", ProfileSchema);

module.exports = Profile;
