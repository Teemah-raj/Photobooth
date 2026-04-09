import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function CameraScreen({ settings }) {
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  // Get settings from props
  const sessionSettings = settings || { photos: 4, timer: 3, format: 'Portrait', theme: 'Vintage' };

  const themeFilters = {
    'Vintage': 'sepia(0.3) contrast(1.1) brightness(0.9)',
    'Black & White': 'grayscale(1) contrast(1.2)',
    'Sepia': 'sepia(1) contrast(0.9)',
    'Modern': 'saturate(1.2) contrast(1.05)',
    'Cyberpunk': 'hue-rotate(280deg) saturate(1.5)',
  };

  const activeFilter = themeFilters[sessionSettings.theme] || 'none';

  const [photos, setPhotos] = useState([]);
  const [notes, setNotes] = useState({});
  const [phase, setPhase] = useState("camera"); // camera | developing | result
  const [countdown, setCountdown] = useState(null);
  const [layout, setLayout] = useState("strip");
  const [showShareModal, setShowShareModal] = useState(false);
  const [shareStep, setShareStep] = useState("options"); // options | resolution | socials

  const [cameraError, setCameraError] = useState(null);
  const [isCameraReady, setIsCameraReady] = useState(false);

  useEffect(() => {
    let stream = null;
    async function startCamera() {
      try {
        setIsCameraReady(false);
        setCameraError(null);
        
        stream = await navigator.mediaDevices.getUserMedia({
          video: {
            width: { ideal: 1280 },
            height: { ideal: 720 },
            facingMode: "user"
          },
          audio: false
        });

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.onloadedmetadata = () => {
            setIsCameraReady(true);
          };
        }
      } catch (err) {
        console.error("Camera access error:", err);
        setCameraError(err.message || "Could not access camera. Please ensure you have given permission.");
      }
    }
    startCamera();

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const capturePhoto = (index = null) => {
    const context = canvasRef.current.getContext("2d");
    
    // Set canvas dimensions based on format
    const width = sessionSettings.format === 'Landscape' ? 480 : 320;
    const height = sessionSettings.format === 'Landscape' ? 360 : 480;
    
    canvasRef.current.width = width;
    canvasRef.current.height = height;
    
    // Apply theme filter to canvas
    context.filter = activeFilter;
    
    context.drawImage(videoRef.current, 0, 0, width, height);
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
    const isLandscape = sessionSettings.format === 'Landscape';

    switch (resolution) {
      case 480:
        width = 480;
        height = isLandscape ? 360 : 640;
        break;
      case 720:
        width = 720;
        height = isLandscape ? 540 : 960;
        break;
      case 1080:
        width = 1080;
        height = isLandscape ? 810 : 1440;
        break;
      default:
        width = isLandscape ? 480 : 320;
        height = isLandscape ? 360 : 480;
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
      <div className="photobooth-machine">
        <div className="booth-front">
          <div className="booth-label">Developing</div>
          <div className="booth-slot-container">
            <div className="booth-slot-trim"></div>
            <div className="developing-strip">
              <div className="spinner"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (phase === "result") {
    return (
      <div className="photobooth-machine">
        <div className="booth-front">
          <div className="booth-label">Vintage Booth</div>
          <div className="booth-slot-container">
            <div className="booth-slot-trim"></div>
            <div className="printing-strip">
              <div className="photo-strip-result">
                {photos.map((src, i) => (
                  <img key={i} src={src} alt={`photo-${i}`} className="photo-strip-image" />
                ))}
              </div>
            </div>
          </div>
        </div>
        
        <div className="result-actions">
          <button className="start-session-button" onClick={() => setShowShareModal(true)}>
            SAVE & SHARE
          </button>
          <button className="retake-all-button" onClick={retakeAll}>
            NEW SESSION
          </button>
        </div>

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

  return (
    <div className="camera-screen-container">
      <div className="camera-header">
        <h1>Camera Booth</h1>
        <div className="session-info">
          <span>{sessionSettings.photos} Photos</span>
          <span>•</span>
          <span>{sessionSettings.timer}s Timer</span>
          <span>•</span>
          <span>{sessionSettings.format}</span>
        </div>
      </div>
      
      <div className="camera-view">
        {!isCameraReady && !cameraError && (
          <div className="camera-loading">
            <div className="spinner"></div>
            <p>Initializing camera...</p>
          </div>
        )}
        
        {cameraError && (
          <div className="camera-error">
            <p>⚠️ {cameraError}</p>
            <button onClick={() => window.location.reload()}>Retry Access</button>
          </div>
        )}

        <video 
          ref={videoRef} 
          autoPlay 
          playsInline 
          className={`camera-video ${isCameraReady ? 'ready' : ''}`}
          style={{ filter: activeFilter }}
        ></video>
        {countdown !== null && <div className="countdown-overlay">{countdown}</div>}
      </div>

      <canvas
        ref={canvasRef}
        style={{ display: "none" }}
      ></canvas>

      <div className="camera-controls">
        <button 
          className="capture-button" 
          onClick={startCountdown}
          disabled={photos.length >= sessionSettings.photos}
        >
          {photos.length >= sessionSettings.photos ? 'Ready to Develop' : `Take Photo (${photos.length}/${sessionSettings.photos})`}
        </button>
        {photos.length > 0 && (
          <button className="retake-all-button" onClick={retakeAll}>
            Retake All
          </button>
        )}
      </div>

      <div className="photos-strip">
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
        <div className="camera-footer">
          <button className="develop-button" onClick={developPhotos}>Develop Photos</button>
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
