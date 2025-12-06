import cloudinary from "../lib/cloudinary.js";
import mongoose from "mongoose";
import { Message } from "../models/message.model.js";
import { User } from "../models/user.model.js";


export const getAllContacts = async (req, res) => {
  try {
    const loggesInUserId = req.user._id;
    const filteredUsers = await User.find({
      _id: { $ne: loggesInUserId },
    }).select("-password");
    return res.status(200).json({
      success: true,
      contacts: filteredUsers,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "internal server error, could not fetch contects",
      error,
    });
  }
};

export const getMessagesByUserId = async (req, res) => {
  try {
    const myId = req.user._id;
    const { id: userToChatId } = req.params;
    const messages = await Message.find({
      $or: [
        { senderId: myId, receiverId: userToChatId },
        { senderId: userToChatId, receiverId: myId },
      ],
    });

    return res.status(200).json({
      success: true,
      message: "messages fetched successfully",
      messages,
    });
  } catch (error) {
    console.log("error while getting message", error.message);
    return res.status(500).json({
      success: false,
      message: "internal server error while fetching messages",
      error,
    });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const { text, image } = req.body;
    if (!text?.trim() && !image) {
      return res.status(400).json({
        success: false,
        message: "cannot send empty message",
      });
    }
    const { id: receiverId } = req.params;
    const senderId = req.user._id;
    if (senderId.equals(receiverId)) {
      return res.status(400).json({
        success: false,
        message: "cannot send message to yourself",
      });
    }
    if (!mongoose.Types.ObjectId.isValid(receiverId)) {
      return res.status(400).json({
        success: false,
        message: "invalid receiver id format",
      });
    }
    const receiverExists = await User.exists({ _id: receiverId });
    if (!receiverExists) {
      return res.status(404).json({
        success: false,
        message: "receiver not found",
      });
    }
    let imageUrl;
    if (image) {
      //upload image as base64 to cloudinary
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadResponse.secure_url;
    }
    const newMessage = new Message({
      senderId,
      receiverId,
      text,
      image: imageUrl,
    });
    await newMessage.save();
    // to-do: send the message to user in realtime if user is online.
    return res.status(200).json({
      message: "message sent!",
      data: newMessage,
    });
  } catch (error) {
    console.log("error while sending message", error.message);
    return res.status(500).json({
      success: false,
      message: "internal server error while sending message",
      error,
    });
  }
};

export const getChatPartners = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const messages = await Message.find({
      $or: [{ senderId: loggedInUserId }, { receiverId: loggedInUserId }],
    });
    const chatPartnersId = [
      ...new Set(
        messages.map((msg) =>
          msg.senderId.toString() === loggedInUserId.toString()
            ? msg.receiverId.toString()
            : msg.senderId.toString()
        )
      ),
    ];
    const chatPartners = await User.find({
      _id: { $in: chatPartnersId },
    }).select("-password");
    return res.status(200).json({
      success: true,
      message: "active chats fetched successfully",
      chats: chatPartners,
    });
  } catch (error) {
    console.log("error while sending message", error.message);
    return res.status(500).json({
      success: false,
      message: "internal server error while sending messages",
      error,
    });
  }
};
