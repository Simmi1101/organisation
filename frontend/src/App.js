// frontend/src/App.js
import React, { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:5000");

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [room, setRoom] = useState("");

  const joinRoom = (roomId) => {
    setRoom(roomId);
    socket.emit("joinRoom", { roomId });
  };

  const sendMessage = () => {
    socket.emit("chatMessage", {
      roomId: room,
      text: input,
      senderId: "user_id",
    });
    setInput("");
  };

  useEffect(() => {
    socket.on("message", (message) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => {
      socket.off();
    };
  }, []);

  return (
    <div>
      <input placeholder="Room ID" onChange={(e) => joinRoom(e.target.value)} />
      <div>
        {messages.map((msg, idx) => (
          <p key={idx}>{msg.text}</p>
        ))}
      </div>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type a message"
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}

export default App;
