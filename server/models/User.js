const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    auth0Id: { type: String, required: true, unique: true, index: true }, // token "sub"
    phone_number: { type: String },
    name: { type: String },
    role: { type: String, default: "student" }
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);

