import React, { useEffect, useState } from "react";
import { Send, X } from "lucide-react";

const Chat = ({ applicationId, onClose }) => {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const token = localStorage.getItem("token");
  const currentUserRole = localStorage.getItem("role"); // student or company

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    const res = await fetch(
      `http://localhost:5000/chat/${applicationId}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    const data = await res.json();
    if (res.ok) setMessages(data);
  };

  const sendMessage = async () => {
    if (!text.trim()) return;

    const res = await fetch(
      `http://localhost:5000/chat/${applicationId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          message: text,
          senderRole: currentUserRole, // make sure backend saves this
        }),
      }
    );

    if (res.ok) {
      setText("");
      fetchMessages();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex justify-center items-center z-50">
      <div className="w-full max-w-3xl h-[80vh] bg-[#070017] rounded-3xl border border-purple-500/40 shadow-[0_0_60px_rgba(129,140,248,0.35)] flex flex-col overflow-hidden">

        {/* Header */}
        <div className="flex justify-between items-center p-5 border-b border-purple-500/30">
          <h2 className="text-xl font-bold text-fuchsia-400">Application Chat</h2>
          <button onClick={onClose} className="text-white hover:text-red-400 transition">
            <X size={20} />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 p-6 overflow-y-auto space-y-4 flex flex-col">
          {messages.map((msg) => {
            const isSentByMe = msg.senderRole === currentUserRole;

            return (
              <div key={msg._id} className={`flex ${isSentByMe ? "justify-end" : "justify-start"}`}>
                <div className="flex flex-col max-w-sm">
                  {/* Sender Name */}
                  <span className={`text-xs mb-1 ${isSentByMe ? "text-fuchsia-400 text-right" : "text-cyan-400"}`}>
                    {isSentByMe
                      ? "You"
                      : msg.senderRole === "company"
                      ? "Company"
                      : "Student"}
                  </span>

                  {/* Message bubble */}
                  <div
                    className={`px-4 py-2 rounded-2xl text-sm shadow-md ${
                      isSentByMe
                        ? "bg-gradient-to-r from-fuchsia-600 to-purple-600 text-white rounded-br-none"
                        : "bg-cyan-500/20 border border-cyan-400/40 text-cyan-100 rounded-bl-none"
                    }`}
                  >
                    {msg.message}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Input */}
        <div className="p-4 border-t border-purple-500/30 flex gap-3">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 px-4 py-2 rounded-xl bg-white/5 border border-purple-500/30 focus:outline-none focus:ring-2 focus:ring-fuchsia-500 text-white"
          />
          <button
            onClick={sendMessage}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-fuchsia-500 to-purple-600 text-white hover:scale-105 transition"
          >
            <Send size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;