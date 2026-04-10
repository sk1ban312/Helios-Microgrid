import "../styles/Token.css";
import mapImg from "../assets/map.png";

const PIE_SLICES = [
  { pct: 70, color: "#00d4ff", label: "Miner Rewards" },
  { pct: 20, color: "#ff6b35", label: "Liquidity Pool" },
  { pct: 10, color: "#48bb78", label: "R&D & Hardware" },
];

const HOW_IT_WORKS = [
  "A connected Helios Sterling Engine generates clean milliwatts (mW) of power.",
  "Our oracle reads the live power output directly from the hardware.",
  "For every milestone reached, the system automatically mints and airdrops $HELIOS tokens directly into the treasury.",
];

const TOKENOMICS_LEGEND = [
  { color: "#00d4ff", title: "70% — \"Proof-of-Power\" Miner Rewards", body: "The tokens you mine for your own benefit." },
  { color: "#ff6b35", title: "20% — Liquidity Pool",                   body: "Keeps the system running 🙂" },
  { color: "#48bb78", title: "10% — R&D & Hardware Development",        body: "For us to keep developing the future of this project." },
];

const PHASES = [
  {
    label: "Phase 1", active: true, title: "The Micro-Grid",
    body: "We launched the coin to build a passionate community and fund the first batch of Helios Nodes. The start of our journey.",
  },
  {
    label: "Phase 2", active: false, title: "Global Decentralization",
    body: "Anyone in the world can buy a Helios Engine, put it in their apartment window or backyard, connect to their WiFi, and start \"mining\" $HELIOS by generating real power that cuts their electricity bill.",
  },
];

function BlinkDot({ active }) {
  return <span className={`phase-dot ${active ? "phase-dot--active" : "phase-dot--inactive"}`} />;
}

function PieChart() {
  const R = 70, CX = 90, CY = 90;
  let startAngle = -90;

  const paths = PIE_SLICES.map((s) => {
    const angle = (s.pct / 100) * 360;
    const toRad = (deg) => (deg * Math.PI) / 180;
    const x1 = CX + R * Math.cos(toRad(startAngle));
    const y1 = CY + R * Math.sin(toRad(startAngle));
    const x2 = CX + R * Math.cos(toRad(startAngle + angle));
    const y2 = CY + R * Math.sin(toRad(startAngle + angle));
    const largeArc = angle > 180 ? 1 : 0;
    const d = `M ${CX} ${CY} L ${x1} ${y1} A ${R} ${R} 0 ${largeArc} 1 ${x2} ${y2} Z`;
    startAngle += angle;
    return { ...s, d };
  });

  return (
    <svg viewBox="0 0 180 180" className="pie-svg" aria-hidden="true">
      {paths.map((p) => (
        <path key={p.label} d={p.d} fill={p.color} opacity="0.92" />
      ))}
      <circle cx={CX} cy={CY} r="35" fill="var(--bg-card)" />
      <text x={CX} y={CY - 5} textAnchor="middle" fontSize="10" fill="var(--text-secondary)">$HELIOS</text>
      <text x={CX} y={CY + 8} textAnchor="middle" fontSize="8"  fill="var(--text-secondary)">Token</text>
    </svg>
  );
}

export default function Token() {
  return (
    <div className="page active token-page">
      <section className="hero">
        <h1>Turn Sunlight into Solana.</h1>
        <p>Welcome to the Helios Grid — Created by Andrey Berks</p>
      </section>

      <div className="token-desc-box">
        <p className="token-desc-line">
          <span className="token-accent">Helios</span> is a Decentralized Physical Infrastructure
          Network (DePIN) that rewards users with crypto for generating verifiable energy.
        </p>
        <div className="token-proof-badge">
          <span className="token-proof-icon">⚡</span>
          <span>
            <strong>"Proof-of-Power."</strong> Instead of Bitcoin's Proof-of-Work, your coin is mined
            by literally creating energy. No shortcuts. Backed by the real world.
          </span>
        </div>
      </div>

      <div className="token-section">
        <h2 className="token-section-title">How does this work?</h2>
        <div className="token-steps">
          {HOW_IT_WORKS.map((text, i) => (
            <div key={i} className="token-step">
              <div className="token-step-num">{String(i + 1).padStart(2, "0")}</div>
              <div className="token-step-text">{text}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="token-info-box">
        <div className="token-info-left">
          {[
            { label: "Token",    value: "HELIOS",       className: "" },
            { label: "Ticker",   value: "$EIO",          className: "token-info-ticker" },
            { label: "Network",  value: null,            className: "" },
            { label: "Contract", value: "J4ynJpMz…BHpump", className: "token-info-addr" },
          ].map(({ label, value, className }, i, arr) => (
            <>
              <div key={label} className={`token-info-item ${label === "Contract" ? "token-info-ca" : ""}`}>
                <span className="token-info-label">{label}</span>
                {label === "Network" ? (
                  <span className="token-info-value token-info-network">
                    <span className="token-network-dot" />Solana
                  </span>
                ) : (
                  <span className={`token-info-value ${className}`}>{value}</span>
                )}
              </div>
              {i < arr.length - 1 && <div key={`div-${i}`} className="token-info-divider" />}
            </>
          ))}
          <a
            className="token-info-buy-btn"
            href="YOUR_TOKEN_LINK"
            target="_blank"
            rel="noopener noreferrer"
          >
            ⚡ Buy $EIO
          </a>
        </div>
        <div className="token-info-chart">
          <iframe
            title="HELIOS Price Chart"
            src="YOUR_TOKEN_CHART_LINK"
            allow="clipboard-write"
          />
        </div>
      </div>

      <div className="token-section">
        <h2 className="token-section-title">Tokenomics</h2>
        <div className="token-omics-box">
          <PieChart />
          <div className="token-omics-legend">
            {TOKENOMICS_LEGEND.map(({ color, title, body }) => (
              <div key={title} className="token-omics-item">
                <span className="token-omics-dot" style={{ background: color }} />
                <div>
                  <strong>{title}</strong>
                  <p>{body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="token-section">
        <h2 className="token-section-title">The Long-Term Vision</h2>
        <div className="token-phases">
          {PHASES.map(({ label, active, title, body }) => (
            <div key={label} className="token-phase-box">
              <div className="token-phase-header">
                <BlinkDot active={active} />
                <span className="token-phase-label">{label}</span>
              </div>
              <h3>{title}</h3>
              <p>{body}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="token-section">
        <h2 className="token-section-title">World Map of Active Users</h2>
        <div className="map-locating-text">This is currently the HELIOS family all around the world</div>
        <div className="token-map">
          <img src={mapImg} alt="World Map of Active Users" className="token-map-img" />
        </div>
      </div>
    </div>
  );
}
