import { useState } from "react";
import image from "../assets/welcome.png"
import { useNavigate } from "react-router-dom";
 import { useAuthStore } from "../store/useAuthStore";
const SignUpPage = () => {
  const navigate = useNavigate();
  const {signup,isSigningUp} = useAuthStore();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    signup(formData);
    navigate("/");
  };

  return (
<div className="flex justify-center items-center w-full">

  <div className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-[0_0_25px_rgba(0,0,50,0.4)] rounded-2xl w-full max-w-4xl flex flex-col md:flex-row overflow-hidden transition transform hover:scale-[1.01] duration-300">

    {/* Left side panel */}
    <div className="bg-gradient-to-br from-blue-600/90 via-indigo-600/90 to-purple-600/90 text-white flex-1 flex flex-col justify-center items-center p-10">

      <img 
        src={image} 
        className="w-40 h-40 object-contain drop-shadow-[0_5px_20px_rgba(0,0,0,0.4)] mb-4"
      />

      <h1 className="text-3xl font-bold mb-2">Hello, Welcome!</h1>
      <p className="mb-4 opacity-90">Already have an account?</p>

      <button onClick={() => navigate("/login")} className="border border-white px-6 py-2 rounded-full hover:bg-white hover:text-blue-600 transition shadow-[0_0_10px_rgba(255,255,255,0.3)]">
        Login
      </button>

    </div>

    {/* Right side */}
    <div className="flex-1 p-10">

      <h2 className="text-2xl font-semibold mb-6 text-center text-white drop-shadow-[0_2px_6px_rgba(89,0,255,0.6)]">
        Register
      </h2>

      <form className="space-y-6" onSubmit={handleSubmit}>

  {/* Full Name */}
  <div className="space-y-1">
    <label className="text-white text-sm opacity-80">Full Name</label>
    <input
      type="text"
      placeholder="Enter your name"
      className="w-full px-4 py-2 bg-white/15 text-white placeholder-gray-300 border border-white/30 rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none shadow-inner"
      value={formData.fullName}
      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
    />
  </div>

  {/* Email */}
  <div className="space-y-1">
    <label className="text-white text-sm opacity-80">Email Address</label>
    <input
      type="email"
      placeholder="example@mail.com"
      className="w-full px-4 py-2 bg-white/15 text-white placeholder-gray-300 border border-white/30 rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none shadow-inner"
      value={formData.email}
      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
    />
  </div>

  {/* Password */}
  <div className="space-y-1">
    <label className="text-white text-sm opacity-80">Password</label>
    <input
      type="password"
      placeholder="●●●●●●●"
      className="w-full px-4 py-2 bg-white/15 text-white placeholder-gray-300 border border-white/30 rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none shadow-inner"
      value={formData.password}
      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
    />
  </div>

  {/* Submit Button */}
  <button
    type="submit"
    className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-medium py-2 rounded-lg shadow-[0_0_15px_rgba(89,0,255,0.5)] hover:shadow-[0_0_25px_rgba(89,0,255,0.8)] transition-all duration-300"
  >
    {isSigningUp ? (<LoaderIcon className="w-full h-5 animate-spin text-center"></LoaderIcon>): ("Create Account")}
  </button>

</form>

    </div>

  </div>
</div>
  );
};

export default SignUpPage;