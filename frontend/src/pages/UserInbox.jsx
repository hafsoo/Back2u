import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";
import axios from "axios";
import { format } from "timeago.js";
import Header from "../components/Layout/Header";
import { server } from "../server";
import { AiOutlineSend, AiOutlineArrowLeft } from "react-icons/ai";
import { TfiGallery } from "react-icons/tfi";
import { useLocation } from "react-router-dom";

const ENDPOINT = "http://localhost:4000";

const UserInbox = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const selectedChatUserId = params.get("chat");

  const { user } = useSelector((state) => state.user);

  const socketRef = useRef(null);
  const scrollRef = useRef(null);

  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [images, setImages] = useState(null);

  const [open, setOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  const [activeStatus, setActiveStatus] = useState(false);

  /* AUTO OPEN CHAT */
  useEffect(() => {
    if (conversations.length && selectedChatUserId) {
      const matchedConversation = conversations.find((c) =>
        c.members.some((m) => m._id === selectedChatUserId),
      );

      if (matchedConversation) {
        setCurrentChat(matchedConversation);
        const otherUser = matchedConversation.members.find(
          (m) => m._id !== user._id,
        );

        setUserData(otherUser);
        setActiveStatus(isOnline(matchedConversation));
        setOpen(true);
      }
    }
  }, [conversations, selectedChatUserId]);

  /* SOCKET */
  useEffect(() => {
    if (!user?._id) return;

    socketRef.current = io(ENDPOINT, { transports: ["websocket"] });
    socketRef.current.emit("addUser", user._id);

    socketRef.current.on("getUsers", (users) => setOnlineUsers(users));

    socketRef.current.on("getMessage", (data) => {
      if (data.conversationId === currentChat?._id) {
        setMessages((prev) => [
          ...prev,
          {
            sender: data.senderId,
            text: data.text,
            images: data.images || null,
            createdAt: data.createdAt || Date.now(),
            // images: data.images,
            //createdAt: Date.now(),
          },
        ]);
      }
    });

    return () => socketRef.current.disconnect();
  }, [user, currentChat]);

  /* FETCH CONVERSATIONS */
  useEffect(() => {
    if (!user?._id) return;

    axios
      .get(`${server}/conversation/user/${user._id}`, {
        withCredentials: true,
      })
      .then((res) => setConversations(res.data.conversations))
      .catch((err) => console.log(err));
  }, [user]);

  /* FETCH MESSAGES */
  useEffect(() => {
    if (!currentChat?._id) return;

    axios
      .get(`${server}/message/${currentChat._id}`, {
        withCredentials: true,
      })
      .then((res) => {
        setMessages(res.data.messages);

        // ✅ Update unread count in frontend
        setConversations((prev) =>
          prev.map((c) =>
            c._id === currentChat._id ? { ...c, unreadCount: 0 } : c,
          ),
        );
      })

      .catch((err) => console.log(err));
  }, [currentChat]);

  /* SEND MESSAGE */
  const sendMessageHandler = async (e) => {
    e.preventDefault();
    if (!newMessage && !images) return;

    const receiver = currentChat.members.find(
      (m) => m?._id && m._id !== user._id,
    );

    if (!receiver?._id) return;

    const receiverId = receiver._id;

    //    socketRef.current.emit("sendMessage", {
    //    senderId: user._id,
    //  receiverId,
    //text: newMessage,
    //images,
    //conversationId: currentChat._id,
    //});
    // 1️⃣ First save message to database
    const res = await axios.post(
      `${server}/message/create`,
      {
        conversationId: currentChat._id,
        text: newMessage,
        images,
      },
      { withCredentials: true },
    );
    const savedMessage = res.data.message;

    // 2️⃣ Then emit saved message (with Cloudinary URL)
    socketRef.current.emit("sendMessage", {
      senderId: user._id,
      receiverId,
      text: savedMessage.text,
      images: savedMessage.images, // 🔥 Now sending cloudinary object
      conversationId: currentChat._id,
      createdAt: savedMessage.createdAt,
    });
    // 3️⃣ Update local messages
    setMessages((prev) => [...prev, savedMessage]);
    // setMessages((prev) => [...prev, res.data.message]);
    setNewMessage("");
    setImages(null);
  };

  const handleImageUpload = (e) => {
    const reader = new FileReader();
    reader.onload = () => reader.readyState === 2 && setImages(reader.result);
    reader.readAsDataURL(e.target.files[0]);
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const isOnline = (chat) => {
    if (!chat?.members) return false;

    const other = chat.members.find((m) => m?._id && m._id !== user._id);
    if (!other?._id) return false;

    return onlineUsers.some(
      (u) => u?.userId?.toString() === other._id?.toString(),
    );
  };

  const isSender = (senderId) => senderId?.toString() === user._id?.toString();

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {!open && (
        <>
          <Header />
          <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
            <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-6 sm:mb-8">
              All Messages
            </h1>

            <div className="bg-white rounded-2xl sm:rounded-3xl shadow-md sm:shadow-lg border border-gray-100 divide-y divide-gray-100 overflow-hidden">
              {conversations.map((c) => {
                const otherUser = c.members.find(
                  (m) => m?._id && m._id !== user._id,
                );
                if (!otherUser) return null;

                return (
                  <div
                    key={c._id}
                    className="flex items-center gap-3 sm:gap-4 px-4 sm:px-6 py-4 sm:py-5 hover:bg-gray-50 transition cursor-pointer"
                    onClick={() => {
                      setCurrentChat(c);
                      setUserData(otherUser);
                      setActiveStatus(isOnline(c));
                      setOpen(true);
                    }}
                  >
                    <div className="relative">
                      <img
                        src={otherUser?.avatar?.url}
                        className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover ring-2 ring-white shadow"
                        alt=""
                      />
                      <span
                        className={`absolute bottom-1 right-1 w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full ring-2 ring-white ${
                          isOnline(c) ? "bg-emerald-500" : "bg-gray-300"
                        }`}
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h2 className="text-sm sm:text-base font-semibold text-gray-900 truncate">
                        {otherUser?.name}
                      </h2>
                      <p className="text-xs sm:text-sm text-gray-500 truncate">
                        {c.lastMessage || "No messages yet"}
                      </p>
                    </div>

                    {/**count messages new ot time */}
                    <div className="flex items-center gap-2 mt-1 sm:mt-0">
                      {c.unreadCount > 0 && (
                        <span className="bg-green-500 text-white text-[10px] px-2 py-[2px] rounded-full">
                          {c.unreadCount}
                        </span>
                      )}
                      <span className="text-xs text-gray-400">
                        {format(c.updatedAt)}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}

      {open && (
        <div className="flex flex-col h-screen sm:min-h-screen w-full max-w-5xl mx-auto bg-white sm:shadow-2xl sm:rounded-3xl sm:my-6 sm:border border-gray-100 overflow-hidden">
          {/* HEADER */}
          <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-100 bg-white">
            <div className="flex items-center gap-3 sm:gap-4">
              <img
                src={userData?.avatar?.url}
                className="w-10 h-10 sm:w-14 sm:h-14 rounded-full object-cover ring-2 ring-gray-100 shadow-sm"
                alt=""
              />
              <div>
                <h1 className="text-sm sm:text-lg font-semibold text-gray-900">
                  {userData?.name}
                </h1>
                <p className="text-[11px] sm:text-xs text-gray-500">
                  {activeStatus ? "Active Now" : "Offline"}
                </p>
              </div>
            </div>

            <AiOutlineArrowLeft
              size={20}
              className="cursor-pointer text-gray-500 hover:text-gray-800 transition"
              onClick={() => setOpen(false)}
            />
          </div>

          {/* MESSAGES */}
          <div
            className="flex-1 overflow-y-auto px-3 sm:px-6 py-4 sm:py-6 bg-gradient-to-b from-gray-50 to-white space-y-3 sm:space-y-4"
            style={{ WebkitOverflowScrolling: "touch" }}
          >
            {messages.map((item, index) => {
              const senderIsUser = isSender(item.sender);
              const otherUserAvatar = !senderIsUser
                ? userData?.avatar?.url
                : null;

              return (
                <div
                  key={index}
                  ref={scrollRef}
                  className={`flex items-end gap-2 sm:gap-3 ${
                    senderIsUser ? "justify-end" : "justify-start"
                  }`}
                >
                  {!senderIsUser && (
                    <img
                      src={otherUserAvatar}
                      className="w-8 h-8 sm:w-9 sm:h-9 rounded-full object-cover shadow"
                      alt=""
                    />
                  )}

                  <div className="max-w-[75%] sm:max-w-xs md:max-w-md">
                    {item.images && (
                      <img
                        src={
                          typeof item.images === "string"
                            ? item.images
                            : item.images.url
                        }
                        className="rounded-2xl mb-2 shadow-md max-w-full h-auto"
                        alt=""
                      />
                    )}

                    {/**    {item.images && ( //just old is item.images
                      <img
                        src={item.images}
                        className="rounded-2xl mb-2 shadow-md max-w-full h-auto"
                        alt=""
                      />
                    )}
                    */}

                    {item.text && (
                      <div
                        className={`px-4 py-2 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-sm ${
                          senderIsUser
                            ? "bg-blue-600 text-white rounded-br-md"
                            : "bg-gray-100 text-gray-800 rounded-bl-md"
                        }`}
                      >
                        {item.text}
                      </div>
                    )}

                    <p className="text-[10px] sm:text-[11px] text-gray-400 mt-1 px-1">
                      {format(item.createdAt)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* INPUT */}
          <form
            onSubmit={sendMessageHandler}
            className="px-3 sm:px-6 py-3 sm:py-4 border-t border-gray-100 bg-white flex items-center gap-2 sm:gap-3"
          >
            <input type="file" hidden id="img" onChange={handleImageUpload} />

            <label
              htmlFor="img"
              className="p-2 rounded-full hover:bg-gray-100 transition cursor-pointer text-gray-500 hover:text-gray-800"
            >
              <TfiGallery size={20} />
            </label>

            <input
              type="text"
              className="flex-1 rounded-full border border-gray-200 bg-gray-50 px-4 py-2 text-sm focus:bg-white focus:border-blue-500 focus:ring-2 sm:focus:ring-4 focus:ring-blue-100 outline-none transition-all duration-200"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message..."
            />

            <button
              type="submit"
              className="p-2 rounded-full bg-blue-600 text-white shadow-md hover:bg-blue-700 hover:shadow-lg transition disabled:opacity-50"
            >
              <AiOutlineSend size={18} />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default UserInbox;
