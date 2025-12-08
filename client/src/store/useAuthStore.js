import toast from "react-hot-toast";
import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import {io} from "socket.io-client";

const BASE_URL = "http://localhost:1000";
export const useAuthStore = create((set, get) => ({
  authUser: (() => {
    try {
      const stored = localStorage.getItem("authUser");
      return stored ? JSON.parse(stored) : null;
    } catch {
      localStorage.removeItem("authUser");
      return null;
    }
  })(),

  isCheckingAuth: true,
  isSignup: false,
  isLogin: false,
  socket: null,
  onlineUsers: [],
  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");

      // always store same structure
      set({ authUser: res.data });
      localStorage.setItem("authUser", JSON.stringify(res.data));
      get().connectSocket()
    } catch (error) {
      set({ authUser: null });
      localStorage.removeItem("authUser");
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (data) => {
    set({ isSignup: true });

    try {
      const res = await axiosInstance.post("/auth/signup", data);

      set({ authUser: res.data });
      localStorage.setItem("authUser", JSON.stringify(res.data));

      toast.success("Signup successful");

    } catch (error) {
      toast.error(error.response?.data?.message || "Signup failed");
    } finally {
      set({ isSignup: false });
    }
  },

  login: async (data) => {
    set({ isLogin: true });
    
    try {
      const res = await axiosInstance.post("/auth/login", data);

      set({ authUser: res.data });
      localStorage.setItem("authUser", JSON.stringify(res.data));

      toast.success("Login successful");
      get().connectSocket()
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      set({ isLogin: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      localStorage.removeItem("authUser");
      toast.success("Logged out");
      get().disconnectSocket();
    } catch (error) {
      toast.error("Logout failed");
    }
  },

  updateProfile: async (data) => {
    try {
      const res = await axiosInstance.put("/auth/update-profile", data);

      const updatedUserData = {
        ...get().authUser,      // keep token and previous fields
        user: res.data.user     // update profile info only
      };

      set({ authUser: updatedUserData });
      localStorage.setItem("authUser", JSON.stringify(updatedUserData));

      toast.success("Profile updated");
    } catch {
      toast.error("Error updating profile");
    }
  },

  connectSocket: async() => {
    const {authUser} = get();
    if(!authUser || get().socket?.connected) return;
    const socket = io(BASE_URL, {
        withCredentials: true // 
       }); 

    socket.connect();
    set({socket});
    
    socket.on("getOnlineUsers", (userIds) => {
      set({onlineUsers: userIds})
    })
  },

  disconnectSocket: async() => {
   if(get().socket.connect) get().socket.disconnect();
  },
  
}));