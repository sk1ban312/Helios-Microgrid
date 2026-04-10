import { Routes, Route, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

import Navbar            from "./components/Navbar";
import Footer            from "./components/Footer";
import ScrollToTopButton from "./components/ScrollToTopButton";

import Home        from "./pages/Home";
import Database    from "./pages/Database";
import About       from "./pages/About";
import DigitalTwin from "./pages/DigitalTwin";
import Token       from "./pages/Token";
import Finance     from "./pages/Finance";
import Research    from "./pages/Research";
import News        from "./pages/News";

import { useFirebase } from "./hooks/useFirebase";
import "./styles/global.css";

export default function App() {
  const location = useLocation();
  const [dbVisited, setDbVisited] = useState(false);

  useEffect(() => {
    if (location.pathname === "/" || location.pathname === "/database") {
      setDbVisited(true);
    }
  }, [location.pathname]);

  const firebaseData = useFirebase(dbVisited);

  return (
    <>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/"             element={<Home     firebaseData={firebaseData} />} />
          <Route path="/database"     element={<Database firebaseData={firebaseData} />} />
          <Route path="/about"        element={<About />} />
          <Route path="/digital-twin" element={<DigitalTwin />} />
          <Route path="/finance"      element={<Finance />} />
          <Route path="/token"        element={<Token />} />
          <Route path="/news"         element={<News />} />
          <Route path="/research"     element={<Research />} />
          <Route path="*"             element={<Home firebaseData={firebaseData} />} />
        </Routes>
      </div>
      <Footer />
      <ScrollToTopButton />
    </>
  );
}
