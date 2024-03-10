const { db } = require("../utils/db.util");
const Profile = require("../models/Profile.model");
const Vote = require("../models/Vote.model");
const User = require("../models/User.model");
const { profile, vote, user } = require("../utils/data");
const { validateNotEmpty, ValidateEntry } = require("../utils/validator.util");

beforeAll(async () => db.connect());
afterAll(async () => db.disconnect());

describe("Voting Test Suite", () => {
  test("Voting on a personality", async () => {
    const aUser = new User(user);
    const createdUser = await aUser.save();
    validateNotEmpty(createdUser);

    const aProfile = new Profile({
      ...profile,
      user: createdUser.id,
    });
    const createdProfile = await aProfile.save();
    validateNotEmpty(createdProfile);

    const aVote = new Vote({
      ...vote,
      profile: createdProfile.id,
      user: createdUser.id,
    });
    const newVote = await aVote.save();
    validateNotEmpty(newVote);
    ValidateEntry(newVote.profile.valueOf(), createdProfile.id);
  });
});
