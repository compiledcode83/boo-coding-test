const { db } = require("../utils/db.util");
const Comment = require("../models/Comment.model");
const Profile = require("../models/Profile.model");
const User = require("../models/User.model");
const { comment, profile, user } = require("../utils/data");
const { validateNotEmpty, ValidateEntry } = require("../utils/validator.util");

beforeAll(async () => db.connect());
afterAll(async () => db.disconnect());

// Create profile and comment
const profileAndComment = async () => {
  const aUser = new User(user);
  const createdUser = await aUser.save();
  validateNotEmpty(createdUser);

  const aProfile = new Profile({
    ...profile,
    user: createdUser.id,
  });

  const createdProfile = await aProfile.save();
  validateNotEmpty(createdProfile);

  const aComment = new Comment({
    ...comment,
    profile: createdProfile.id,
    user: createdUser.id,
  });
  const newComment = await aComment.save();

  validateNotEmpty(newComment);
  ValidateEntry(createdProfile.id, newComment.profile.valueOf());

  return newComment;
};

describe("Comment Test Suite", () => {
  test("Validates comment posting", async () => {
    await profileAndComment();
  });

  test("List all comments", async () => {
    await profileAndComment();
    expect(() => Comment.find({})).not.toThrow();
  });

  test("Sort Comments By Recent", async () => {
    await profileAndComment();
    expect(() => Comment.find({}).sort({ _id: -1 })).not.toThrow();
  });

  test("Sort Comments By No of Likes", async () => {
    await profileAndComment();
    expect(() => Comment.find({}).sort({ likes: "desc" })).not.toThrow();
  });

  test("Filter Comments", async () => {
    await profileAndComment();
    expect(() => Comment.find({ mbti: "INTP" })).not.toThrow();
  });

  test("Like Comment", async () => {
    const comment = await profileAndComment();
    expect(() =>
      Comment.findOneAndUpdate(
        { _id: comment.id },
        {
          likes: comment.likes + 1,
        }
      )
    ).not.toThrow();
  });

  test("UnLike Comment", async () => {
    const new_comment = await profileAndComment();
    expect(() =>
      Comment.findOneAndUpdate(
        { _id: new_comment.id },
        {
          likes: new_comment.likes - 1,
        }
      )
    ).not.toThrow();
  });
});
