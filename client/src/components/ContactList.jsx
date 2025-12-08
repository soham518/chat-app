import { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import UsersLoadingSkeleton from "./UserLoadingSkeleton";
import { useAuthStore } from "../store/useAuthStore";

function ContactList() {
  const { getAllContacts, allContacts = [], setSelectedUser, isUsersLoading } = useChatStore();
  const { onlineUsers } = useAuthStore();

  useEffect(() => {
    getAllContacts();
    console.log(allContacts)
  }, []); // don't put function in deps — causes re-render loops

  if (isUsersLoading) return <UsersLoadingSkeleton />;

  if (!Array.isArray(allContacts) || allContacts.length === 0) {
    return <p className="text-slate-400 text-center p-4">No contacts found</p>;
  }

  return (
    <>
      {allContacts.map((contact) => (
        <div
          key={contact._id}
          onClick={() => setSelectedUser(contact)}
          className="bg-white/10 backdrop-blur-md border border-white/10
                     rounded-lg p-3 cursor-pointer hover:bg-white/15
                     transition duration-200"
        >
          <div className="flex items-center gap-3">

            {/* avatar */}
            <div className={`avatar ${onlineUsers?.includes(contact._id) ? "online" : "offline"}`}>
              <div className="w-10 h-10 rounded-full overflow-hidden">
                <img
                  src={contact.profilePic || "/avatar.png"}
                  alt={contact.fullName}
                  className="object-cover w-full h-full"
                />
              </div>
            </div>

            {/* name */}
            <h4 className="text-slate-200 text-sm font-medium truncate">
              {contact.fullName}
            </h4>
          </div>
        </div>
      ))}
    </>
  );
}

export default ContactList;