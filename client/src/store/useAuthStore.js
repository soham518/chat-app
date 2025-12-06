import { create } from "zustand";
import {axiosInstance} from "../lib/axios"
import toast from "react-hot-toast";
export const useAuthStore = create((set) => ({
   authUser: null,
   isCheckingAuth: true,
   isSignup: false,
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
   }
}));
