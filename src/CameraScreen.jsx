import { useState, useEffect, useRef } from "react";

function CameraScreen() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const [photos, setPhotos] = useState([]);
  const [notes, setNotes] = useState({});
  const [phase, setPhase] = useState("camera"); // camera | developing | result
  const [countdown, setCountdown] = useState(null);
  const [layout, setLayout] = useState("strip");
  const [showShareModal, setShowShareModal] = useState(false);
  const [shareStep, setShareStep] = useState("options"); // options | resolution | socials

  const sessionSettings = { photos: 4, timer: 3 };

  useEffect(() => {
    async function startCamera() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        videoRef.current.srcObject = stream;
      } catch (err) {
        console.error("Camera error:", err);
      }
    }
    startCamera();
  }, []);

  const capturePhoto = (index = null) => {
    const context = canvasRef.current.getContext("2d");
    context.drawImage(videoRef.current, 0, 0, 320, 240);
    const imageData = canvasRef.current.toDataURL("image/png");

    setPhotos((prev) => {
      if (index !== null) {
        const updated = [...prev];
        updated[index] = imageData;
        return updated;
      }
      return [...prev, imageData];
    });
  };

  const startCountdown = () => {
    let time = sessionSettings.timer;
    setCountdown(time);

    const interval = setInterval(() => {
      time -= 1;
      if (time > 0) {
        setCountdown(time);
      } else {
        clearInterval(interval);
        setCountdown(null);
        capturePhoto();
      }
    }, 1000);
  };

  const retakeAll = () => {
    setPhotos([]);
    setNotes({});
    setPhase("camera");
  };

  const addNote = (index) => {
    const text = prompt("Enter a note for this photo:");
    if (text) {
      setNotes((prev) => ({ ...prev, [index]: text }));
    }
  };

  const developPhotos = () => {
    setPhase("developing");
    setTimeout(() => {
      setPhase("result");
    }, 3000);
  };

  const downloadPhotos = (resolution) => {
    const collage = document.createElement("canvas");
    const ctx = collage.getContext("2d");

    let width, height;
    switch (resolution) {
      case 480:
        width = 480;
        height = 360;
        break;
      case 720:
        width = 720;
        height = 540;
        break;
      case 1080:
        width = 1080;
        height = 810;
        break;
      default:
        width = 320;
        height = 240;
    }

    if (layout === "strip") {
      collage.width = width;
      collage.height = height * photos.length;
      photos.forEach((src, i) => {
        const img = new Image();
        img.src = src;
        img.onload = () => {
          ctx.drawImage(img, 0, i * height, width, height);
          if (i === photos.length - 1) {
            const link = document.createElement("a");
            link.download = "photobooth.png";
            link.href = collage.toDataURL("image/png");
            link.click();
          }
        };
      });
    } else {
      collage.width = width * 2;
      collage.height = height * 2;
      photos.forEach((src, i) => {
        const img = new Image();
        img.src = src;
        img.onload = () => {
          const x = (i % 2) * width;
          const y = Math.floor(i / 2) * height;
          ctx.drawImage(img, x, y, width, height);
          if (i === photos.length - 1) {
            const link = document.createElement("a");
            link.download = "photobooth.png";
            link.href = collage.toDataURL("image/png");
            link.click();
          }
        };
      });
    }
    setShowShareModal(false);
    setShareStep("options"); // reset after download
  };

  // --- Render phases ---
  if (phase === "developing") {
    return (
      <div style={styles.developing}>
        <div style={styles.developingBox}>
          <h2>Applying chemicals...</h2>
        </div>
      </div>
    );
  }

  if (phase === "result") {
    return (
      <div style={styles.container}>
        <h1>Your Keepsake</h1>
        <div style={layout === "strip" ? styles.strip : styles.grid}>
          {photos.map((src, i) => (
            <div key={i} style={styles.photoBox}>
              <img src={src} alt={`photo-${i}`} style={styles.photo} />
              {notes[i] && <p style={styles.note}>{notes[i]}</p>}
            </div>
          ))}
        </div>
        <div style={styles.toggle}>
          <button onClick={() => setLayout("strip")}>Photo Strip</button>
          <button onClick={() => setLayout("grid")}>Grid</button>
        </div>
        <button style={styles.button} onClick={() => setShowShareModal(true)}>
          Save & Share
        </button>

        {/* Share Modal */}
        {showShareModal && (
          <div>
            <div
              style={styles.overlay}
              onClick={() => {
                setShowShareModal(false);
                setShareStep("options");
              }}
            ></div>
            <div style={styles.modal}>
              {shareStep === "options" && (
                <div>
                  <h3>Choose an option</h3>
                  <button onClick={() => setShareStep("resolution")}>
                    Download Photos
                  </button>
                  <button onClick={() => setShareStep("socials")}>
                    Share to Socials
                  </button>
                </div>
              )}
              {shareStep === "resolution" && (
                <div>
                  <h3>Select Resolution</h3>
                  <button onClick={() => downloadPhotos(320)}>320px</button>
                  <button onClick={() => downloadPhotos(480)}>480px</button>
                  <button onClick={() => downloadPhotos(720)}>720px</button>
                  <button onClick={() => downloadPhotos(1080)}>1080px</button>
                  <button onClick={() => setShareStep("options")}>Back</button>
                </div>
              )}
              {shareStep === "socials" && (
                <div>
                  <h3>Share to:</h3>
                  <button>Instagram</button>
                  <button>Twitter/X</button>
                  <button>Facebook</button>
                  <button onClick={() => setShareStep("options")}>Back</button>
                </div>
              )}
              <button
                onClick={() => {
                  setShowShareModal(false);
                  setShareStep("options");
                }}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Default: camera phase
  return (
    <div style={styles.container}>
      <h1>Camera Booth</h1>
      <video ref={videoRef} autoPlay playsInline style={styles.video}></video>
      <canvas
        ref={canvasRef}
        width="320"
        height="240"
        style={{ display: "none" }}
      ></canvas>

      {countdown !== null && <h2>{countdown}</h2>}

      <button style={styles.button} onClick={startCountdown}>
        Take Photo ({photos.length}/{sessionSettings.photos})
      </button>

      {/* Gallery with retake + note options */}
      <div style={styles.gallery}>
        {photos.map((src, i) => (
          <div key={i} style={styles.photoBox}>
            <img src={src} alt={`photo-${i}`} style={styles.photo} />
            <div style={styles.actions}>
              <button onClick={() => capturePhoto(i)}>Retake</button>
              <button onClick={() => addNote(i)}>Add Note</button>
            </div>
          </div>
        ))}
      </div>

      {photos.length > 0 && (
        <div style={styles.actionsRow}>
          <button onClick={retakeAll}>Retake All</button>
          <button onClick={developPhotos}>Develop Photos</button>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: { textAlign: "center", marginTop: "20px" },
  video: { width: "320px", height: "240px", border: "2px solid #333" },
  button: { marginTop: "15px", padding: "10px 20px", cursor: "pointer" },
  gallery: {
    marginTop: "20px",
    display: "flex",
    gap: "15px",
    justifyContent: "center",
    flexWrap: "wrap",
  },
  photoBox: { position: "relative", textAlign: "center" },
  photo: { width: "120px", height: "90px", border: "1px solid #ccc" },
  actions: {
    marginTop: "5px",
    display: "flex",
    gap: "5px",
    justifyContent: "center",
  },
  actionsRow: {
    marginTop: "20px",
    display: "flex",
    gap: "15px",
    justifyContent: "center",
  },
  toggle: {
    marginTop: "20px",
    display: "flex",
    gap: "10px",
    justifyContent: "center",
  },
  note: {
    fontSize: "0.8rem",
    color: "#555",
    marginTop: "5px",
  },
  developing: {
    backgroundColor: "#2b2b2b",
    color: "#d4b483",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontStyle: "italic",
  },
  developingBox: {
    backgroundColor: "#d4b483",
    padding: "20px",
    borderRadius: "5px",
    color: "#2b2b2b",
  },
  modal: {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
    zIndex: 1000,
    textAlign: "center",
  },
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.5)",
    zIndex: 999,
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))",
    gap: "10px",
    justifyItems: "center",
    marginTop: "20px",
  },
};

export default CameraScreen;
