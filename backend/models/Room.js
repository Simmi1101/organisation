// models/Room.js
const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
  name: { type: String, required: true },
  roomType: {
    type: String,
    enum: ["group", "leader-deptHead", "deptHead-admin"],
  },
  users: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});

module.exports = mongoose.model("Room", roomSchema);
