import { LoaderIcon } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
const LogInPage = () => {
  const {signup,isSigningUp} = useAuthStore();
  const navigate = useNavigate();
  return (
    <div className="flex justify-center items-center w-full">
      <div className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-xl rounded-2xl w-full max-w-4xl flex flex-col md:flex-row overflow-hidden">
        
        {/* Left section */}
        <div className="bg-blue-500/90 text-white flex-1 flex flex-col justify-center items-center p-10">
          <h1 className="text-3xl font-bold mb-2">Hello, Welcome!</h1>
          <p className="mb-4 opacity-90">Don't have an account?</p>
          <button onClick={() => navigate("/signup")} className="border border-white px-6 py-2 rounded-full hover:bg-white hover:text-blue-600 transition">
            Register
          </button>
        </div>

        {/* Right section */}
        <div className="flex-1 p-10">
          <h2 className="text-2xl font-semibold mb-6 text-center text-white">Login</h2>

          <form className="space-y-6">

  {/* Username */}
  <div className="space-y-1">
    <label className="text-white text-sm opacity-80">Username</label>
    <input
      type="text"
      placeholder="Enter username"
      className="w-full px-4 py-2 bg-white/15 text-white placeholder-gray-300 border border-white/30 rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none shadow-inner"
    />
  </div>

  {/* Password */}
  <div className="space-y-1">
    <label className="text-white text-sm opacity-80">Password</label>
    <input
      type="password"
      placeholder="******"
      className="w-full px-4 py-2 bg-white/15 text-white placeholder-gray-300 border border-white/30 rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none shadow-inner"
    />
  </div>

  {/* Forgot Password */}
  <div className="text-right text-sm text-gray-200 hover:text-indigo-400 cursor-pointer transition">
    Forgot Password?
  </div>

  {/* Submit */}
  <button
    className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-medium py-2 rounded-lg shadow-[0_0_15px_rgba(89,0,255,0.5)] hover:shadow-[0_0_25px_rgba(89,0,255,0.8)] transition-all duration-300"
    disabled={isSigningUp}
  >
    Login
  </button>

</form>
        </div>

      </div>
    </div>
  );
};

export default LogInPage;