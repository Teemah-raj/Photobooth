import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav style={styles.nav}>
      <Link to="/">Home</Link>
      <Link to="/booth">Booth</Link>
      <Link to="/themes">Themes</Link>
      <Link to="/gallery">Gallery</Link>
    </nav>
  );
}

const styles = {
  nav: {
    display: "flex",
    gap: "20px",
    justifyContent: "center",
    marginTop: "20px",
  },
};

export default Navbar;
