import { useState, useRef, useEffect } from "react";
import { LogOutIcon, VolumeOffIcon, Volume2Icon } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";
import avatar from "../../public/avatar.png"
// const mouseClickSound = new Audio("/sounds/mouse-click.mp3");

function ProfileHeader() {
  const { logout, authUser, updateProfile } = useAuthStore();
  const { isSoundEnabled, toggleSound } = useChatStore();
  const [selectedImg, setSelectedImg] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const fileInputRef = useRef(null);

  // 🔹 Log user from localStorage on mount
 useEffect(() => {
  const storedUser = JSON.parse(localStorage.getItem("authUser"));
  console.log("User from localStorage:", storedUser);
  setCurrentUser(storedUser);
}, []);

useEffect(() => {
  if (currentUser) {
    console.log("Updated user:", currentUser);
    console.log("Profile Pic:", currentUser.profilePic);
  }
}, [currentUser]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      await updateProfile({ profilePic: base64Image });
    };
  };

return (
  <div className="p-6 border-b border-white/10">
    <div className="flex items-center justify-between">
      
      {/* USER SECTION */}
      <div className="flex items-center gap-4">
        
        {/* Avatar */}
        <button
          className="size-14 rounded-full overflow-hidden relative group border border-white/20 shadow-md"
          onClick={() => fileInputRef.current.click()}
        >
          <img
            src={selectedImg || authUser?.user?.profilePic || avatar}
            alt="User"
            className="size-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
            <span className="text-white text-xs">Change</span>
          </div>
        </button>

        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleImageUpload}
          className="hidden"
        />

        {/* USER INFO */}
        <div className="flex flex-col leading-tight">
          <h3 className="text-white font-medium text-sm max-w-[180px] truncate">
            {authUser?.user?.fullName}
          </h3>

          <p className="text-slate-300 text-xs max-w-[180px] truncate">
            {authUser?.user?.email}
          </p>

          <p className="text-green-400 text-[10px]">● Online</p>
        </div>
      </div>

      {/* ACTION BUTTONS */}
      <div className="flex gap-4 items-center">

        {/* LOGOUT */}
        <button
          className="text-slate-400 hover:text-white transition-colors"
          onClick={logout}
        >
          <LogOutIcon className="size-5" />
        </button>

        {/* SOUND TOGGLE */}
        <button
          className="text-slate-400 hover:text-white transition-colors"
          onClick={() => {
            mouseClickSound.currentTime = 0;
            mouseClickSound.play().catch((e) => console.log("Sound failed:", e));
            toggleSound();
          }}
        >
          {isSoundEnabled ? (
            <Volume2Icon className="size-5" />
          ) : (
            <VolumeOffIcon className="size-5" />
          )}
        </button>

      </div>
    </div>
  </div>
);
}

export default ProfileHeader;