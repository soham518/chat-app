import { useAuthStore } from "../store/useAuthStore";


const ChatPage = () => {
const {logout} = useAuthStore();

  return <>
  <button onClick={logout} className="btn">Logout</button>
    <div>Chat page</div>
  </>;
};

export default ChatPage;
