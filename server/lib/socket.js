import { Server } from "socket.io";
import { socketAuthMiddleware } from "../middlewares/socket.auth.middleware.js";
import "dotenv/config"
// holds socket.io reference
let io;

const setupSocket = (httpServer) => {
  io = new Server(httpServer, {
    cors: {
      origin: process.env.CLIENT_URL,
      credentials: true,
    },
  });

  io.use(socketAuthMiddleware);

  const userSocketMap = {};

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

export { setupSocket, io };