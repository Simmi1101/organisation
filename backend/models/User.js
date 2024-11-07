// models/User.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  role: {
    type: String,
    enum: ["admin", "department_head", "group_leader", "group_member"],
    required: true,
  },
  department: { type: mongoose.Schema.Types.ObjectId, ref: "Department" },
  group: { type: mongoose.Schema.Types.ObjectId, ref: "Group" },
});

module.exports = mongoose.model("User", userSchema);
