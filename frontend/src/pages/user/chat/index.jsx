import { useEffect, useState } from "react";
import { getChat, sendUserMessage } from "../../../_services/chat";

function Chat() {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  const user = JSON.parse(localStorage.getItem("userInfo"));

  const loadChat = async () => {
    if (!user) return;

    try {
      const data = await getChat(user.id);
      setMessages(data);
    } catch (err) {
      console.error("Error load chat:", err);
    }
  };

  useEffect(() => {
    loadChat();
    const interval = setInterval(loadChat, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleSend = async () => {
    if (!text.trim()) return;

    try {
      await sendUserMessage(text);
      setText("");
      loadChat();
    } catch (err) {
      console.error("Error send chat:", err);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Live Chat</h2>

      <div
        style={{
          border: "1px solid #ccc",
          height: "350px",
          overflowY: "auto",
          padding: "10px",
          marginBottom: "10px",
          background: "#f9f9f9"
        }}
      >
        {messages.length === 0 ? (
          <p>Belum ada pesan...</p>
        ) : (
          messages.map((msg) => (
            <div
              key={msg.id}
              style={{
                textAlign: msg.sender === "user" ? "right" : "left",
                marginBottom: "8px"
              }}
            >
              <span
                style={{
                  background: msg.sender === "user" ? "#DCF8C6" : "#fff",
                  padding: "8px 12px",
                  borderRadius: "12px",
                  display: "inline-block"
                }}
              >
                {msg.message}
              </span>
            </div>
          ))
        )}
      </div>

      <div style={{ display: "flex", gap: "10px" }}>
        <input
          style={{ flex: 1, padding: "8px" }}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Ketik pesan..."
        />
        <button onClick={handleSend}>Kirim</button>
      </div>
    </div>
  );
}

export default Chat;