const { db } = require("./db.util");
const Profile = require("../models/profile.model");
const profiles = [
  {
    id: 1,
    name: "A Martinez",
    description: "Adolph Larrue Martinez III.",
    mbti: "ISFJ",
    enneagram: "9w3",
    variant: "sp/so",
    tritype: 725,
    socionics: "SEE",
    sloan: "RCOEN",
    psyche: "FEVL",
    image: "https://soulverse.boo.world/images/1.png",
  },
];

async function seedDB() {
  await db.connect();

  await Profile.deleteMany({});

  const profile = await Profile.insertMany(profiles);
  console.log(profile);
  await db.disconnect();
  return;
}

console.log(seedDB());
