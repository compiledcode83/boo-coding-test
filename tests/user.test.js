const { db } = require("../utils/db.util");
const User = require("../models/User.model");
const { user } = require("../utils/data");
const { validateNotEmpty } = require("../utils/validator.util");

beforeAll(async () => db.connect());
afterAll(async () => db.disconnect());

describe("User Account Suite", () => {
  test("Validate account creation", async () => {
    const aUser = new User(user);
    const createdUser = await aUser.save();
    validateNotEmpty(createdUser);
  });
});
