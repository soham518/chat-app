import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import ProfileHeader from "../components/ProfileHeader";
import ActiveTabSwitch from "../components/ActiveTabSwitch";
import ChatList from "../components/ChatList";
import ContactList from "../components/ContactList";
import ChatContainer from "../components/ChatContainer";
import NoConversationPlaceholder from "../components/NoConversationPlaceholder";
import PageLoader from "../components/PageLoder";

const ChatPage = () => {
  const { activeTab, selectedUser } = useChatStore();
  const { logout, isLogin, isCheckingAuth } = useAuthStore();

  if (isCheckingAuth) return <PageLoader />;  // still verifying session
  if (isLogin) return <PageLoader />;         // during login submission

  return (
    <div className="relative w-full max-w-6xl h-[650px] bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-[0_0_25px_rgba(0,0,50,0.4)] overflow-hidden flex">
      
      {/* SIDEBAR */}
      <div className="w-[35%] bg-gradient-to-b from-slate-900/60 via-slate-800/50 to-slate-900/60 border-r border-white/10 flex flex-col">
        
        <div className="p-4 border-b border-white/10">
          <ProfileHeader />
        </div>

        <div className="p-2">
          <ActiveTabSwitch />
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-2 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
          {activeTab === "chats" ? <ChatList /> : <ContactList />}
        </div>

        <button
          onClick={logout}
          className="m-4 w-28 bg-cyan-600 hover:bg-cyan-900 text-white py-2 rounded-lg shadow transition-all duration-300"
        >
          Logout
        </button>
      </div>

      {/* CHAT AREA */}
      <div className="flex-1 flex flex-col bg-gradient-to-br from-slate-900/60 via-slate-800/50 to-slate-900/60 backdrop-blur-xl">
        {selectedUser ? <ChatContainer /> : <NoConversationPlaceholder />}
      </div>
    </div>
  );
};

export default ChatPage;