import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({ //new is used as we are creating an object here
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        require: true
    },
    receiverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        require: true
    },
    text: {
        type: String
    },
    image: {
        type: String
    },

},{timestamps: true});

export const Message = mongoose.model("Message",messageSchema); 