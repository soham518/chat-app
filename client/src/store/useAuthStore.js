import { create } from "zustand";
import {axiosInstance} from "../lib/axios"
import toast from "react-hot-toast";
export const useAuthStore = create((set) => ({
   authUser: null,
   isCheckingAuth: true,
   isSignup: false,
   isLogin: false,
   checkAuth: async()=> {
    try {
        const res = await axiosInstance.get("/auth/check");
        set({authUser: res.data});

    } catch (error) {
        console.log("error in auth check",error.message);
        set({authUser: null});
    } finally{
        set({isCheckingAuth: false});
    }
   },
   signup: async(data) => {
    set({isSignup: true});
    try {
        const res = await axiosInstance.post("/auth/signup",data);
        set({authUser: res.data});
        //toast
        toast.success("signup successful");
    } catch (error) {
        toast.error(error.response.data.message);
    } finally {
        set({isSignup: false});
    }
   },
   login: async(data) => {
    set({isLogin: true});
    try {
        const res = await axiosInstance.post("/auth/login",data);
        set({authUser: res.data});
        //toast
        toast.success("login successful");
    } catch (error) {
        toast.error(error.response.data.message);
    } finally {
        set({isLogin: false});
    }
   },
   logout: async() => {
    try {
        await axiosInstance.post("/auth/logout");
        toast.success("logged out successfully");
        set({authUser: null});
    } catch (error) {
        console.log("error loging out",error);
        toast.error("error logging out")
    }
   }
}));
