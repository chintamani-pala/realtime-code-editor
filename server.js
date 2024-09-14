import express from "express";
import http from "http";
import { Server } from "socket.io";
import ACTIONS from "./src/Actions.js";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// Define __dirname in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(
  cors({
    origin: process.env.CLIENT_URL || "*",
  })
);

const server = http.createServer(app);
const io = new Server(server);

app.use(express.static("dist"));
app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});
const userSocketMap = {};

// Function to get all connected clients in a room
function getAllConnectedClients(roomId) {
  return Array.from(io.sockets.adapter.rooms.get(roomId) || []).map(
    (socketId) => ({
      socketId,
      userName: userSocketMap[socketId],
    })
  );
}

io.on("connection", (socket) => {
  console.log("Socket connected:", socket.id);

  // Handling the JOIN event
  socket.on(ACTIONS.JOIN, ({ roomId, userName }) => {
    userSocketMap[socket.id] = userName;
    socket.join(roomId);

    const clients = getAllConnectedClients(roomId);
    clients.forEach(({ socketId }) => {
      io.to(socketId).emit(ACTIONS.JOINED, {
        clients,
        userName,
        socketId: socket.id,
      });
    });
  });

  socket.on(ACTIONS.CODE_CHANGED, ({ roomId, code, lang }) => {
    io.to(roomId).emit(ACTIONS.CODE_CHANGED, { code, lang });
  });

  // Handling socket disconnection
  socket.on("disconnecting", () => {
    console.log("Disconnecting triggered:", socket.id);
    const rooms = [...socket.rooms]; // List of rooms the socket is in

    rooms.forEach((roomId) => {
      socket.in(roomId).emit(ACTIONS.DISCONNECTED, {
        socketId: socket.id,
        userName: userSocketMap[socket.id],
      });
    });
    delete userSocketMap[socket.id];
    socket.leave();
  });

  // socket.on("disconnecting", () => {
  //   console.log(socket.rooms); // Set { ... }
  // });

  // socket.on("disconnect", () => {
  //   console.log("Socket disconnected:", socket.id);
  //   delete userSocketMap[socket.id]; // Remove user from the map
  // });
});

const PORT = process.env?.PORT || 8000;

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
