import { useNavigate } from "react-router-dom";

function HomeScreen() {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>📸 Vintage Booth</h1>
      <p style={styles.subtitle}>Capture moments in timeless style</p>

      <button style={styles.button} onClick={() => navigate("/booth")}>
        Start Session
      </button>

      <div style={styles.navbar}>
        <button onClick={() => navigate("/")}>Home</button>
        {/* <button onClick={() => navigate("/themes")}>Themes</button> */}
        <button onClick={() => navigate("/booth")}>Booth</button>
        <button onClick={() => navigate("/gallery")}>Gallery</button>
      </div>
    </div>
  );
}

const styles = {
  container: { textAlign: "center", marginTop: "50px" },
  title: { fontSize: "2rem", fontWeight: "bold" },
  subtitle: { fontSize: "1rem", color: "#555" },
  button: {
    marginTop: "20px",
    padding: "10px 20px",
    fontSize: "1rem",
    cursor: "pointer",
  },
  navbar: {
    marginTop: "40px",
    display: "flex",
    gap: "15px",
    justifyContent: "center",
  },
};

export default HomeScreen;
