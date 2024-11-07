// backend/routes/roomRoutes.js
const express = require("express");
const Room = require("../models/Room");
const router = express.Router();

router.post("/create-room", async (req, res) => {
  const { name, roomType, userIds } = req.body;
  try {
    const room = new Room({ name, roomType, users: userIds });
    await room.save();
    res.status(201).json(room);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
