import { useState } from "react";
import { useNavigate } from "react-router-dom";

function BoothScreen() {
  const navigate = useNavigate();

  // State for session settings
  const [photos, setPhotos] = useState(4);
  const [timer, setTimer] = useState(3);
  const [format, setFormat] = useState("portrait");

  const handleStart = () => {
    // Later this will lead to Camera screen
    // For now, just log settings and navigate
    console.log("Session Settings:", { photos, timer, format });
    navigate("/camera"); // You’ll create CameraScreen.jsx next
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Session Settings</h1>

      {/* Photos */}
      <div style={styles.section}>
        <h3>Photos</h3>
        {[1, 3, 4, 6].map((num) => (
          <button
            key={num}
            style={photos === num ? styles.activeButton : styles.button}
            onClick={() => setPhotos(num)}
          >
            {num}
          </button>
        ))}
      </div>

      {/* Timer */}
      <div style={styles.section}>
        <h3>Timer</h3>
        {[3, 5, 10].map((sec) => (
          <button
            key={sec}
            style={timer === sec ? styles.activeButton : styles.button}
            onClick={() => setTimer(sec)}
          >
            {sec}s
          </button>
        ))}
      </div>

      {/* Format */}
      <div style={styles.section}>
        <h3>Format</h3>
        {["portrait", "landscape"].map((f) => (
          <button
            key={f}
            style={format === f ? styles.activeButton : styles.button}
            onClick={() => setFormat(f)}
          >
            {f}
          </button>
        ))}
      </div>

      <button style={styles.startButton} onClick={handleStart}>
        Done → Start Camera
      </button>
    </div>
  );
}

const styles = {
  container: { textAlign: "center", marginTop: "40px" },
  title: { fontSize: "1.5rem", marginBottom: "20px" },
  section: { marginBottom: "20px" },
  button: {
    margin: "5px",
    padding: "10px 15px",
    cursor: "pointer",
    border: "1px solid #ccc",
    borderRadius: "5px",
  },
  activeButton: {
    margin: "5px",
    padding: "10px 15px",
    cursor: "pointer",
    border: "2px solid #333",
    borderRadius: "5px",
    backgroundColor: "#eee",
  },
  startButton: {
    marginTop: "30px",
    padding: "12px 25px",
    fontSize: "1rem",
    cursor: "pointer",
    backgroundColor: "#333",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
  },
};

export default BoothScreen;
