// assuming mongoose@6.x
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");

async function connect() {
  //connecting to the database
  if (process.env.NODE_ENV === "test") {
    const mongod = await MongoMemoryServer.create();
    await mongoose.connect(mongod.getUri(), {
      useNewUrlParser: false,
      useUnifiedTopology: false,
    });
    console.log("New Test connection");
  } else if (process.env.NODE_ENV === "development") {
    const dbURI = process.env.DB_URI;
    mongoose.connect(dbURI, {
      useNewUrlParser: false,
      useUnifiedTopology: false,
    });
    console.log("New Development connection");
  }
}

//disconnect from the database.
async function disconnect() {
  await mongoose.connection.close();
  // await mongoose.connection.dropCollection()
  console.log("Disconnected");
}

function convertDocToObj(doc) {
  doc.str;
  return doc;
}

const db = { connect, disconnect, convertDocToObj };
module.exports = { db };
