import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { useAuthStore } from "./useAuthStore";

export const useChatStore = create((set, get) => ({
  allContacts: [],
  chats: [],
  messages: [],
  activeTab: "chats",
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,
  isSoundEnabled: JSON.parse(localStorage.getItem("isSoundEnabled")) === true,

  toggleSound: () => {
    localStorage.setItem("isSoundEnabled", !get().isSoundEnabled);
    set({ isSoundEnabled: !get().isSoundEnabled });
  },

  setActiveTab: (tab) => set({ activeTab: tab }),
  setSelectedUser: (selectedUser) => set({ selectedUser }),

  getAllContacts: async () => {
  set({ isUsersLoading: true });

  try {
    const res = await axiosInstance.get("/messages/contacts");

    // normalize response
    const list =
      Array.isArray(res.data) ?
      res.data :
      res.data?.contacts ??
      res.data?.users ??
      [];

    set({ allContacts: list });

  } catch (error) {
    console.log("Contact fetch error:", error);
    toast.error(error.response?.data?.message || "Error loading contacts");
    set({ allContacts: [] });
  } finally {
    set({ isUsersLoading: false });
  }
},
getMyChatPartners: async () => {
  set({ isUsersLoading: true });

  try {
    const res = await axiosInstance.get("/messages/chats");

    // normalize response safely
    let list = [];

    if (Array.isArray(res.data)) {
      list = res.data;
    } else if (Array.isArray(res.data?.users)) {
      list = res.data.users;
    } else if (Array.isArray(res.data?.chats)) {
      list = res.data.chats;
    }

    set({ chats: list });

  } catch (error) {
    console.log("Chat load error:", error);
    toast.error(error.response?.data?.message || "Something went wrong");
    set({ chats: [] });
  } finally {
    set({ isUsersLoading: false });
  }
},

getMessagesByUserId: async (userId) => {
  set({ isMessagesLoading: true });

  try {
    const res = await axiosInstance.get(`/messages/${userId}`);

    const list = 
      Array.isArray(res.data?.messages) 
        ? res.data.messages 
        : [];

    set({ messages: list });

    console.log("messages saved to store:", list);

  } catch (error) {
    console.log("message fetch error:", error);
    toast.error(error.response?.data?.message || "Something went wrong");
    set({ messages: [] });
  } finally {
    set({ isMessagesLoading: false });
  }
},

sendMessage: async(messageData) => {
  const { selectedUser, messages } = get();
  const {authUser} = useAuthStore.getState();

  const tempId =  `temp-${Date.now()}`
  //to handle the crash or error while sending message
  const optimisticMessage = {
    _id : tempId,
    senderId: authUser._id,
    receiverId: selectedUser._id,
    text: messageData.text,
    image: messageData.image,
    createdAt: new Date().toISOString(),
    isOptimistic: true
  }
  set({messages: [...messages,optimisticMessage]})
    try{
     const res = await axiosInstance.post(`/messages/send/${selectedUser._id}`, messageData);
     console.log("sended message from use chat store",res.data.data);
     set({messages: messages.concat(res.data.data)})

    } catch {
      set({messages: messages});
      toast.error(error.response?.data?.message || "something went wrong while sending messages");
    }
},

  subscribeToMessages: () => {
    const { selectedUser, isSoundEnabled } = get();
    if (!selectedUser) return;

    const socket = useAuthStore.getState().socket;

    socket.on("newMessage", (newMessage) => {
      const isMessageSentFromSelectedUser = newMessage.senderId === selectedUser._id;
      if (!isMessageSentFromSelectedUser) return;

      const currentMessages = get().messages;
      set({ messages: [...currentMessages, newMessage] });

      // if (isSoundEnabled) {
      //   const notificationSound = new Audio("/sounds/notification.mp3");

      //   notificationSound.currentTime = 0; // reset to start
      //   notificationSound.play().catch((e) => console.log("Audio play failed:", e));
      // }
    });
  },

  unsubscribeFromMessages: () => {
    const socket = useAuthStore.getState().socket;
    socket.off("newMessage");
  },
}));