import { useEffect, useState } from "react";
import { getChat, sendUserMessage } from "../../../_services/chat";
import { FaPaperPlane } from "react-icons/fa";

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

  const handleSend = async (e) => {
    e.preventDefault();
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
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card border-0 shadow-lg rounded-4 overflow-hidden">
            <div className="card-header bg-primary text-white p-3 d-flex align-items-center justify-content-between">
              <h5 className="mb-0 fw-bold">Live Chat EduEvent Pro</h5>
              <div className="badge bg-light text-primary">Admin Online</div>
            </div>
            
            <div 
              className="card-body bg-light p-4" 
              style={{ height: "450px", overflowY: "auto", display: "flex", flexDirection: "column-reverse" }}
            >
              <div className="d-flex flex-column">
                {messages.length === 0 ? (
                  <div className="text-center my-5 py-5 text-muted">
                    <p className="mb-0">Belum ada pesan.</p>
                    <small>Silahkan kirim pesan untuk mulai berkonsultasi.</small>
                  </div>
                ) : (
                  messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`mb-3 d-flex ${msg.sender === "user" ? "justify-content-end" : "justify-content-start"}`}
                    >
                      <div
                        style={{
                          maxWidth: "80%",
                          padding: "10px 16px",
                          borderRadius: msg.sender === "user" ? "18px 18px 0 18px" : "18px 18px 18px 0",
                          backgroundColor: msg.sender === "user" ? "#014AB0" : "#fff",
                          color: msg.sender === "user" ? "#fff" : "#333",
                          boxShadow: "0 2px 5px rgba(0,0,0,0.05)"
                        }}
                      >
                        <div className="mb-1">{msg.message}</div>
                        <div 
                          className={`small opacity-75 ${msg.sender === "user" ? "text-end" : "text-start"}`} 
                          style={{ fontSize: "0.65rem" }}
                        >
                          {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="card-footer bg-white p-3 border-0">
              <form className="d-flex gap-2" onSubmit={handleSend}>
                <input
                  className="form-control rounded-pill px-4 bg-light border-0"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Ketik pesan di sini..."
                  style={{ height: "45px" }}
                />
                <button 
                  type="submit"
                  className="btn btn-primary rounded-circle d-flex align-items-center justify-content-center shadow-sm" 
                  style={{ width: "45px", height: "45px" }}
                >
                  <FaPaperPlane />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chat;