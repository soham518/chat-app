import { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import UserLoadingSkeleton from "./UserLoadingSkeleton";
import NoChatsFound from "./NoChatsFound";
import { useAuthStore } from "../store/useAuthStore";

const ChatList = () => {
  const {
    getMyChatPartners,
    chats,
    isUsersLoading,
    setSelectedUser,
  } = useChatStore();
  const {onlineUsers} = useAuthStore();
  useEffect(() => {
    getMyChatPartners();
  }, []); // avoid unstable dependency rerender loops

  if (isUsersLoading) return <UserLoadingSkeleton />;

  if (!chats || chats.length === 0) return <NoChatsFound />;

  return (
    <>
      {chats.map((chat) => (
        <div
  key={chat._id}
  onClick={() => setSelectedUser(chat)}
  className="bg-blue/10 backdrop-blur-md border border-white/10
             rounded-lg p-3 cursor-pointer hover:bg-white/15
             transition duration-200"
>
  <div className="flex items-center gap-3">

    {/* avatar */}
    <div className={`avatar ${onlineUsers?.includes(chat._id) ? "online" : "offline"}`}>
      <div className="w-10 h-10 rounded-full overflow-hidden">
        <img
          src={chat.profilePic || "/avatar.png"}
          alt={chat.fullName}
          className="object-cover w-full h-full"
        />
      </div>
    </div>

    {/* username */}
    <h4 className="text-slate-200 text-sm font-medium truncate">
      {chat.fullName}
    </h4>

  </div>
</div>
      ))}
    </>
  );
};

export default ChatList;