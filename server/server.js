import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import path from "path";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
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
// app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: "5mb" }));

app.use(cookieParser());

const __dirname = path.resolve();

app.listen(port, () => {
  console.log("app is running on port", port);
});
app.get("/", (req, res) => {
  res.send("welcome to chat app");
});

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

//make redy for deployment
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/dist")));
}

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client", "dist", "index.html"));
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
