import { useEffect, useRef } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import NoChatHistoryPlaceholder from "./NoChatHistoryPlaceholder";

const ChatContainer = () => {
  const {
    selectedUser,
    getMessagesByUserId,
    messages,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useChatStore();
  const { authUser } = useAuthStore();
  const user = authUser?.user;

  const scrollContainerRef = useRef(null);

  // Load messages when switching user
  useEffect(() => {
    if (selectedUser?._id) {
      getMessagesByUserId(selectedUser._id);
      subscribeToMessages();

      return () => unsubscribeFromMessages();
    }
    //cleanup
  }, [selectedUser, getMessagesByUserId, subscribeToMessages,unsubscribeFromMessages ]);

  // Auto scroll to the bottom ON new messages
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop =
        scrollContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="flex flex-col h-full bg-white/10 backdrop-blur-xl border-l border-white/10">
      <ChatHeader />

      {/* Messages Scroll Area */}
      <div
        ref={scrollContainerRef}
        className="flex-1 px-6 overflow-y-auto py-8"
      >
        {messages.length > 0 ? (
          <div className="max-w-3xl mx-auto space-y-6">
            {messages.map((mess) => (
              <div
                key={mess._id}
                className={`chat ${
                  mess.senderId === user._id ? "chat-end" : "chat-start"
                }`}
              >
                <div
                  className={`chat-bubble relative ${
                    mess.senderId === user._id
                      ? "bg-cyan-600 text-white"
                      : "bg-slate-800 text-slate-200"
                  }`}
                >
                  {mess.text && <p className="mt-2">{mess.text}</p>}
                  {mess.image && (
                    <img
                      src={mess.image}
                      alt="Shared"
                      className="rounded-lg h-48 object-cover"
                    />
                  )}
                  <p className="mt-1 text-xs">
                    {new Date().toISOString().substring(11, 16)}
                  </p>{" "}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <NoChatHistoryPlaceholder name={selectedUser.fullName} />
        )}
      </div>

      <div className="border-t border-white/10 bg-slate-900/40 backdrop-blur-xl">
        <MessageInput />
      </div>
    </div>
  );
};

export default ChatContainer;
