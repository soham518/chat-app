import { XIcon } from "lucide-react";
import avatar from "../../public/avatar.png";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const profilePic = selectedUser?.profilePic;
  const { onlineUsers } = useAuthStore();
  const isOnline = onlineUsers.includes(selectedUser._id);
  return (
    <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md border-b border-white/10 p-3">
      {/* Avatar */}
      <div className="w-10 h-10 rounded-full overflow-hidden border border-white/20">
        <img
          src={profilePic || avatar}
          className="object-cover w-full h-full"
          alt="user"
        />
      </div>

      {/* Name */}
      <div className="flex flex-col leading-tight">
        <h2 className="text-slate-200 text-sm font-medium">
          {selectedUser?.fullName}
        </h2>
        <p
          className={`${isOnline ? "text-green-500" : "text-gray-400"} text-xs`}
        >
          {isOnline ? "online" : "offline"}
        </p>
      </div>

      {/* Close icon */}
      <XIcon
        onClick={() => setSelectedUser(null)}
        className="w-5 h-5 text-slate-300 hover:text-white transition cursor-pointer ml-auto"
      />
    </div>
  );
};

export default ChatHeader;
