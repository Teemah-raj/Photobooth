import { useState } from "react";
import { useNavigate } from "react-router-dom";

function GalleryScreen() {
  const navigate = useNavigate();

  // Example session data — later you can load this from localStorage or a backend
  const [sessions, setSessions] = useState([
    {
      id: 1,
      date: "2/21/2026",
      layout: "GRID",
      photos: [
        "/path/photo1.png",
        "/path/photo2.png",
        "/path/photo3.png",
        "/path/photo4.png",
      ],
    },
    // Add more sessions here
  ]);

  const deleteSession = (id) => {
    setSessions((prev) => prev.filter((s) => s.id !== id));
  };

  const downloadSession = (session) => {
    // For now just simulate download
    alert(`Downloading session from ${session.date}`);
  };

  return (
    <div style={styles.container}>
      <h1>Session History</h1>
      <p>Your collection of moments</p>

      {sessions.length === 0 ? (
        <p>No sessions yet. Start your first photobooth session.</p>
      ) : (
        <div style={styles.sessionList}>
          {sessions.map((session) => (
            <div key={session.id} style={styles.sessionCard}>
              <div style={styles.photoGrid}>
                {session.photos.map((src, i) => (
                  <img key={i} src={src} alt={`session-${i}`} style={styles.photo} />
                ))}
              </div>
              <p>{session.date}</p>
              <p>{session.layout}</p>
              <div style={styles.actions}>
                <button onClick={() => downloadSession(session)}>⬇ Download</button>
                <button onClick={() => deleteSession(session.id)}>🗑 Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}

      <button style={styles.newSession} onClick={() => navigate("/booth")}>
        New Session
      </button>

      {/* Bottom navigation bar */}
      <div style={styles.navbar}>
        <button onClick={() => navigate("/")}>Home</button>
        <button onClick={() => navigate("/themes")}>Themes</button>
        <button onClick={() => navigate("/booth")}>Booth</button>
        <button onClick={() => navigate("/gallery")}>Gallery</button>
      </div>
    </div>
  );
}

const styles = {
  container: { textAlign: "center", padding: "20px" },
  sessionList: { display: "flex", flexDirection: "column", gap: "20px", marginTop: "20px" },
  sessionCard: { border: "1px solid #ccc", padding: "10px", borderRadius: "8px" },
  photoGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(80px, 1fr))",
    gap: "5px",
    justifyItems: "center",
  },
  photo: { width: "80px", height: "60px", objectFit: "cover", border: "1px solid #aaa" },
  actions: { display: "flex", gap: "10px", justifyContent: "center", marginTop: "10px" },
  newSession: {
    marginTop: "20px",
    padding: "10px 20px",
    backgroundColor: "#333",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  navbar: {
    position: "fixed",
    bottom: 0,
    left: 0,
    width: "100%",
    display: "flex",
    justifyContent: "space-around",
    padding: "10px",
    backgroundColor: "#f5f5f5",
    borderTop: "1px solid #ccc",
  },
};

export default GalleryScreen;
