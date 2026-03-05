import React, { useEffect, useState } from "react";
import Sidebar from "../../../components/admin/sidebar";
import Topbar from "../../../components/admin/topbar";
import { getChat, sendAdminMessage } from "../../../_services/chat";
import { useParams, useNavigate } from "react-router-dom";
import { FaPaperPlane, FaArrowLeft } from "react-icons/fa";

export default function AdminChatDetail() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [userName, setUserName] = useState("");

  const loadChat = async () => {
    try {
      const data = await getChat(userId);
      setMessages(data);
      // Assuming the first message has the user info or we just set a generic name
      if (data.length > 0) {
        setUserName(data[0].user?.name || "User");
      }
    } catch (err) {
      console.error("Error load chat:", err);
    }
  };

  useEffect(() => {
    loadChat();
    const interval = setInterval(loadChat, 3000);
    return () => clearInterval(interval);
  }, [userId]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    try {
      await sendAdminMessage(userId, text);
      setText("");
      loadChat();
    } catch (err) {
      console.error("Error send chat:", err);
    }
  };

  return (
    <div className="d-flex" style={{ minHeight: "100vh" }}>
      <Sidebar />
      <div className="flex-grow-1 d-flex flex-column">
        <Topbar />
        <div className="p-4 flex-grow-1 d-flex flex-column" style={{ maxHeight: "calc(100vh - 70px)" }}>
          <div className="mb-3 d-flex align-items-center">
            <button className="btn btn-outline-secondary me-3" onClick={() => navigate("/admin/users")}>
              <FaArrowLeft />
            </button>
            <h4 className="m-0 fw-bold">Chat with {userName}</h4>
          </div>

          <div
            className="flex-grow-1 bg-white rounded-4 shadow-sm p-4 mb-3"
            style={{ overflowY: "auto", display: "flex", flexDirection: "column-reverse" }}
          >
            <div className="d-flex flex-column">
              {messages.length === 0 ? (
                <p className="text-center text-muted my-5">Belum ada pesan...</p>
              ) : (
                messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`mb-3 d-flex ${msg.sender === "admin" ? "justify-content-end" : "justify-content-start"}`}
                  >
                    <div
                      style={{
                        maxWidth: "70%",
                        padding: "10px 16px",
                        borderRadius: msg.sender === "admin" ? "18px 18px 0 18px" : "18px 18px 18px 0",
                        backgroundColor: msg.sender === "admin" ? "#0d6efd" : "#f1f1f1",
                        color: msg.sender === "admin" ? "#fff" : "#333",
                        boxShadow: "0 2px 4px rgba(0,0,0,0.05)"
                      }}
                    >
                      <div className="mb-1">{msg.message}</div>
                      <div
                        className="small opacity-75 text-end"
                        style={{ fontSize: "0.7rem" }}
                      >
                        {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <form className="d-flex gap-2" onSubmit={handleSend}>
            <input
              className="form-control rounded-pill px-4 shadow-sm"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Tulis pesan ke user..."
              style={{ border: "none" }}
            />
            <button className="btn btn-primary rounded-circle shadow-sm d-flex align-items-center justify-content-center" style={{ width: "45px", height: "45px" }}>
              <FaPaperPlane />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
