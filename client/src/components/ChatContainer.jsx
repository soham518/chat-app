import { useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";
import ChatHeader from "./ChatHeader";
import NoChatHistoryPlaceholder from "./NoChatHistoryPlaceholder";
import MessageInput from "./MessageInput";
import MessagesLoadingSkeletonn from "./MessagesLoadingSkeletonn";
const ChatContainer = () => {
  const { selectedUser, getMessagesByUserId, messages, isMessagesLoading } = useChatStore();
  const { authUser } = useAuthStore();
  const user = authUser?.user;

  useEffect(() => {
    if (selectedUser?._id) {
      getMessagesByUserId(selectedUser._id);
      console.log("messages fetched for", selectedUser.fullName);
      console.log("messages",messages);
    }
  }, [selectedUser, getMessagesByUserId]);

  return (
    <>
 <div className="flex flex-col h-full">

      {/* header */}
      <ChatHeader />

      {/* messages area */}
      <div className="flex-1 px-6 overflow-y-auto py-8">
        {messages?.messages?.length > 0  && !isMessagesLoading ? (
          <div className="max-w-3xl mx-auto space-y-6">
            {messages.messages.map((msg) => (
              <div
                key={msg._id}
                className={`chat ${msg.senderId === user._id ? "chat-end" : "chat-start"}`}
              >
                <div
                  className={`chat-bubble relative ${
                    msg.senderId === user._id
                      ? "bg-cyan-600 text-white"
                      : "bg-slate-800 text-slate-200"
                  }`}
                >
                  {msg.text && <p className="mt-2">{msg.text}</p>}
                  {msg.image && <img src={msg.image} className="rounded-lg h-48 object-cover"></img>}
                  <p className="text-xs mt-1 opacity-75 flex items-center gap-1">
                  {new Date(msg.createdAt).toISOString().slice(11,16)}
                  </p>

                </div>
              </div>
            ))}
          </div>

        ): isMessagesLoading ? <MessagesLoadingSkeletonn /> : (
          <NoChatHistoryPlaceholder />
        )}
      </div>

    </div>
    <div>
      <MessageInput />
    </div>
    </>
   
  );
};

export default ChatContainer;