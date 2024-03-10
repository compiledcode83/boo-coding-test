const { db } = require("../utils/db.util");
const Profile = require("../models/Profile.model");
const User = require("../models/User.model");
const { profile, user } = require("../utils/data");
const { validateNotEmpty } = require("../utils/validator.util");

beforeAll(async () => db.connect());
afterAll(async () => db.disconnect());

describe("Profile Test Suite", () => {
  test("Validates profile creation", async () => {
    const aUser = new User(user);
    const createdUser = await aUser.save();
    validateNotEmpty(createdUser);

    const aProfile = new Profile({
      ...profile,
      user: createdUser.id,
    });
    const createdProfile = await aProfile.save();
    validateNotEmpty(createdProfile);
  });

  test("Fetch a profile by Id", async () => {
    const aUser = new User(user);
    const createdUser = await aUser.save();
    validateNotEmpty(createdUser);

    const aProfile = new Profile({
      ...profile,
      user: createdUser.id,
    });
    const createdProfile = await aProfile.save();
    const gotProfile = await Profile.findById(createdProfile.id);
    expect(gotProfile.id).toBe(createdProfile.id);
  });
});
