import { Route, Routes } from "react-router";
import ChatPage from "./pages/ChatPage";
import LogInPage from "./pages/LogInPage";
import SignUpPage from "./pages/SignUpPage";
import { useAuthStore } from "./store/useAuthStore";
const App = () => {
  const {authUser, isLoggedIn, login} = useAuthStore();

  console.log("auth user:",authUser,"is loggedin:",isLoggedIn);
  return (
    <div className="min-h-screen bg-slate-900 relative flex items-center justify-center p-4 overflow-hidden">
    <Routes>
      <Route path="/" element={<ChatPage />} />
      <Route path="/login" element={<LogInPage />} />
      <Route path="/signup" element={<SignUpPage />} />
    </Routes>
    </div>
    
  );
};

export default App;
