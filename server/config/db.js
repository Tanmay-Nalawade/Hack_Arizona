const mongoose = require("mongoose");

async function connectDb(mongoUri) {
  if (!mongoUri) throw new Error("MONGODB_URI is required");
  await mongoose.connect(mongoUri);
  return mongoose.connection;
}

module.exports = { connectDb };

