import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "../styles/Navbar.css";
import logoImg from "../assets/UET_Logo.png";

const NAV_ITEMS = [
  { path: "/",             label: "Home" },
  { path: "/database",     label: "Database" },
  { path: "/about",        label: "About Us" },
  { path: "/digital-twin", label: "Digital Twin" },
  { path: "/finance",      label: "Finance" },
  { path: "/token",        label: "Our Token" },
  { path: "/news",         label: "News" },
  { path: "/research",     label: "Research" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    document.documentElement.style.overflow = menuOpen ? "hidden" : "";
    document.documentElement.classList.toggle("nav-open", menuOpen);
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      document.documentElement.classList.remove("nav-open");
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <header>
        <nav>
          <Link to="/" className="logo" onClick={closeMenu}>
            <img src={logoImg} alt="Helios logo" className="logo-icon" />
            HELIOS
          </Link>

          <button
            className={`hamburger ${menuOpen ? "active" : ""}`}
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Toggle navigation menu"
          >
            <span /><span /><span />
          </button>

          <ul className={`nav-links ${menuOpen ? "open" : ""}`}>
            {NAV_ITEMS.map(({ path, label }) => (
              <li key={path}>
                <Link
                  to={path}
                  className={location.pathname === path ? "active" : ""}
                  onClick={closeMenu}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      {menuOpen && (
        <div
          onClick={closeMenu}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.45)",
            zIndex: 98,
            touchAction: "none",
            pointerEvents: "all",
          }}
        />
      )}
    </>
  );
}
