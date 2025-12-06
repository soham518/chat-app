import { Route, Routes } from "react-router";
import {Toaster} from "react-hot-toast";
import ChatPage from "./pages/ChatPage";
import LogInPage from "./pages/LogInPage";
import SignUpPage from "./pages/SignUpPage";
import PageLoader from "./components/PageLoder";
import { Navigate } from "react-router";
import { useAuthStore } from "./store/useAuthStore";
import { useEffect } from "react";
const App = () => {
  const {authUser,isCheckingAuth,checkAuth} = useAuthStore();

  useEffect(()=>{
   checkAuth();
  },[isCheckingAuth]);
  console.log({authUser});

  if(isCheckingAuth) {
    return <PageLoader></PageLoader>
  }
  return (
<div className="min-h-screen bg-gradient-to-br from-gray-950 via-slate-900 to-indigo-950 relative flex items-center justify-center p-4 overflow-hidden">

  {/* Floating glow */}
  <div className="absolute -top-32 -left-32 w-80 h-80 bg-indigo-500 rounded-full blur-[140px] opacity-30"></div>
  <div className="absolute -bottom-32 -right-32 w-80 h-80 bg-purple-500 rounded-full blur-[140px] opacity-30"></div>

  <Routes>
    <Route path="/" element={authUser ? <ChatPage /> : <Navigate to={"/login"} />} />
    <Route path="/login" element={!authUser ? <LogInPage /> : <Navigate to={"/"} />} />
    <Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to={"/"} />} />
  </Routes>

  <Toaster />
</div>
    
  );
};

export default App;
