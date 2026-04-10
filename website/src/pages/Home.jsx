import { Link } from "react-router-dom";
import StatCard from "../components/StatCard";
import { useWeather } from "../hooks/useWeather";
import "../styles/Home.css";
import InstlogoImg from "../assets/icon_inst.png";
import LIlogoImg   from "../assets/icon_linkedin.png";
import DTLogo      from "../assets/DT_Logo.png";
import GHLogo      from "../assets/icon_github.png";

const SOCIAL_LINKS = [
  { href: "YOUR_INST_URL", title: "Instagram", src: InstlogoImg, alt: "Instagram" },
  { href: "YOUR_LINKEDIN_URL", title: "LinkedIn",  src: LIlogoImg,   alt: "LinkedIn" },
  { href: "YOUR_GITHUB_URL", title: "GitHub",    src: GHLogo,      alt: "GitHub" },
];

function getOnlineStatus(timestamp) {
  if (!timestamp || timestamp === "--") return false;
  const lastSeen = new Date(timestamp).getTime();
  return !isNaN(lastSeen) && Date.now() - lastSeen < 30_000;
}

export default function Home({ firebaseData }) {
  const weather = useWeather();
  const isOnline = getOnlineStatus(firebaseData?.timestamp);

  const statusColor = isOnline ? "var(--success)" : "#ff4d4d";

  return (
    <div id="home" className="page active">
      <section className="hero">
        <h1>HELIOS Project</h1>
        <p>Autonomous, intelligent CHP microgrid utilizing thermal cascade for maximum energy efficiency</p>
      </section>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-label">System Status</div>
          <div className="stat-value" style={{ fontSize: "26px", color: statusColor }}>
            {isOnline ? "Online" : "Offline"}
          </div>
          <div className="stat-label" style={{ marginTop: "10px" }}>
            <span
              className="status-indicator"
              style={{ background: statusColor, animation: isOnline ? "pulse 2s infinite" : "none" }}
            />
            {isOnline ? "Receiving data" : "Old data"}
          </div>
        </div>

        <StatCard label="Total Power"   value={firebaseData?.powerMw ?? "--"} unit="W" />
        <StatCard label="Total Voltage" value={firebaseData?.totalV   ?? "--"} unit="V" />
        <StatCard label="Total Current" value={firebaseData?.totalC   ?? "--"} unit="A" />
      </div>

      <div className="widgets-row">
        <div className="weather-widget">
          <div className="weather-left">
            <div className="weather-icon">{weather.icon}</div>
            <div>
              <div className="weather-temp">{weather.temp}°C</div>
              <div className="weather-location">{weather.location}</div>
            </div>
          </div>
          <div className="weather-right">
            {[
              { label: "🌅 Sunrise", value: weather.sunrise },
              { label: "🌇 Sunset",  value: weather.sunset },
            ].map(({ label, value }) => (
              <div key={label} className="weather-sun-row">
                <span className="weather-sun-label">{label}</span>
                <span className="weather-sun-value">{value}</span>
              </div>
            ))}
          </div>
        </div>

        <Link to="/digital-twin" className="digital-twin-card">
          <div className="digital-twin-inner">
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <img src={DTLogo} alt="Helios logo" className="DT-logo-icon" />
              <div>
                <p>Helios</p>
                <h3>Digital Twin</h3>
              </div>
            </div>
          </div>
        </Link>
      </div>

      <div className="card">
        <h2 className="card-title">🔗 Connect With Us</h2>
        <div className="social-links">
          {SOCIAL_LINKS.map(({ href, title, src, alt }) => (
            <a key={title} href={href} className="social-link" title={title} target="_blank" rel="noreferrer">
              <img src={src} alt={alt} />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
