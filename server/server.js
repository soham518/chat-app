import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import path from "path";
import http from "http";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import { setupSocket } from "./lib/socket.js";

dotenv.config({ path: "./.env" });

//1. app setup
const port = process.env.PORT;
console.log("port:", port);
const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);
app.options("*", cors());

app.use(express.json({ limit: "5mb" }));
app.use(cookieParser());

const __dirname = path.resolve();

// attach express to HTTP server
const httpServer = http.createServer(app);

// attach socket.io to this server
setupSocket(httpServer);

// API routes
app.get("/", (req, res) => {
  res.send("welcome to chat app");
});

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

// deployment handling
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/dist")));
}

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client", "dist", "index.html"));
});

// Start server
httpServer.listen(port, () => {
  console.log("Server running on port", port);
});

//2.connect db
mongoose
  .connect(process.env.MONGO_URI, {
    dbName: "chatify",
  })
  .then(() => {
    console.log("mongo db connected successfully");
  })
  .catch((err) => {
    console.error("could not connect mongo db", err);
  });