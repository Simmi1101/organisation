// sockets/chatSocket.js
const socketIo = require("socket.io");
const Room = require("../models/Room");
const Message = require("../models/Message");

module.exports = (server) => {
  const io = socketIo(server);

  io.on("connection", (socket) => {
    console.log("New client connected");

    // Join Room
    socket.on("joinRoom", ({ roomId, userId }) => {
      socket.join(roomId);
      io.to(roomId).emit("message", {
        userId,
        text: `${userId} has joined the room`,
      });
    });

    // Listen for Chat Messages
    socket.on("chatMessage", async ({ roomId, senderId, text }) => {
      const message = new Message({ roomId, sender: senderId, text });
      await message.save();

      io.to(roomId).emit("message", { senderId, text });
    });

    // Disconnect
    socket.on("disconnect", () => {
      console.log("Client disconnected");
    });
  });
};
