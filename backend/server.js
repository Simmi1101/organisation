// backend/server.js
const express = require("express");
const http = require("http");
const mongoose = require("mongoose");
const socketSetup = require("./sockets/chatSocket");
const roomRoutes = require("./routes/roomRoutes");
require("dotenv").config();

const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(express.json());
app.use("/api/rooms", roomRoutes);

socketSetup(server);

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
