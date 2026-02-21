import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomeScreen from "./HomeScreen";
import BoothScreen from "./BoothScreen";
import CameraScreen from "./CameraScreen";
// import ThemesScreen from "./ThemesScreen";
import GalleryScreen from "./GalleryScreen";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/booth" element={<BoothScreen />} />
        <Route path="/camera" element={<CameraScreen />} />
        {/* <Route path="/themes" element={<ThemesScreen />} /> */}
        <Route path="/gallery" element={<GalleryScreen />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

