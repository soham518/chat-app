import { Server } from "socket.io";
import { socketAuthMiddleware } from "../middlewares/socket.auth.middleware.js";
import "dotenv/config";

// global socket registry
let io;
const userSocketMap = {}; // track online users

const setupSocket = (httpServer) => {
  io = new Server(httpServer, {
    cors: {
      origin: process.env.CLIENT_URL,
      credentials: true,
    },
  });

  io.use(socketAuthMiddleware);

  io.on("connection", (socket) => {
    console.log("A user connected", socket.user.fullName);

    const userId = socket.userId;
    userSocketMap[userId] = socket.id;

    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    socket.on("disconnect", () => {
      console.log("A user disconnected", socket.user.fullName);
      delete userSocketMap[userId];
      io.emit("getOnlineUsers", Object.keys(userSocketMap));
    });
  });

  return io;
};

// Now this is correctly at top level (not inside setupSocket)
const getReceiverSocketId = (userId) => userSocketMap[userId];

export { setupSocket, io, getReceiverSocketId };