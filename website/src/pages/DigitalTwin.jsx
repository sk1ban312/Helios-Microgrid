import { useState, Suspense } from "react";
import "../styles/DigitalTwin.css";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, Environment } from "@react-three/drei";

const SUBSYSTEMS = [
  {
    id: "mechanical",
    icon: "🔥",
    title: "Mechanical-Thermal Subsystem",
    color: "#ff6b35",
    items: [
      {
        label: "HT Stirling Engine",
        detail: "A primary heat source powers the High-Temperature Stirling Engine — the first stage of the thermal cascade.",
      },
      {
        label: "MT Stirling Engine",
        detail: "Waste heat from the HT engine is captured and channeled into a Medium-Temperature Stirling Engine, extracting a second round of useful work.",
      },
      {
        label: "LT Thermoelectric Generators (TEGs)",
        detail: "Final-stage waste heat from the MT engine is converted to electricity by an array of Low-Temperature TEGs, squeezing the last available energy from the cascade.",
      },
    ],
  },
  {
    id: "electrical",
    icon: "⚡",
    title: "Electrical Power Subsystem",
    color: "#f6ad55",
    items: [
      {
        label: "Generation",
        detail: "DC hobby motors attached to the HT/MT engines and the TEG array produce low-voltage, variable DC power.",
      },
      {
        label: "Conditioning & Charging",
        detail: "Power outputs are consolidated through Schottky diodes and fed into an MT3608 Boost Converter. This module outputs a stable 5 V DC to provide a continuous trickle-charge to the main system battery.",
      },
      {
        label: "Storage & Distribution",
        detail: "A central 10,000 mAh USB Power Bank serves as the primary power reservoir, ensuring multi-hour operational runtime and providing stable 5 V power for all electronics.",
      },
    ],
  },
  {
    id: "cyber",
    icon: "🤖",
    title: "Cyber-Physical & Data Subsystem",
    color: "#00d4ff",
    items: [
      {
        label: "Sensing — Arduino Nano",
        detail: "An Arduino Nano acts as a dedicated sensor hub, collecting real-time data from all sensors across the system.",
      },
      {
        label: "Control & Processing — Raspberry Pi 4",
        detail: "A Raspberry Pi 4 serves as the central brain, running the data collection scripts, the core API, the database, and the machine learning models.",
      },
    ],
  },
];

const OVERVIEW_STATS = [
  { value: "3",       label: "Thermal stages",      color: "#ff6b35" },
  { value: "5 V",     label: "Regulated output",    color: "#f6ad55" },
  { value: "10 Ah",   label: "Power bank capacity", color: "#48bb78" },
  { value: "RPi\u00a04", label: "Central processing",  color: "#00d4ff" },
];

const FLOW_NODES = [
  { icon: "🔥", label: "Primary Heat Source", type: "ht" },
  { icon: "⚙️", label: "HT Stirling Engine",  type: "ht" },
  { icon: "⚙️", label: "MT Stirling Engine",  type: "mt" },
  { icon: "🌡️", label: "LT TEG Array",        type: "lt" },
  { icon: "⚡", label: "Power Bank & Electronics", type: "elec" },
];

function ModelLoader() {
  return (
    <div className="dt-model-loading">
      <div className="dt-model-loading-spinner">
        <div className="dt-spinner-ring" />
        <div className="dt-spinner-core">🏗️</div>
      </div>
      <p className="dt-model-loading-text">Loading 3D Model…</p>
      <p className="dt-model-loading-sub">Initialising HIT station geometry</p>
    </div>
  );
}

function HitModel() {
  const { scene } = useGLTF("/models/hit-station.glb");
  return <primitive object={scene} scale={3} position={[0, -1, 0]} />;
}

function SubsystemCard({ sys }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={`dt-subsystem-card ${open ? "dt-subsystem-card--open" : ""}`}
      style={{ "--accent-color": sys.color }}
    >
      <button
        className="dt-subsystem-header"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
      >
        <span className="dt-subsystem-icon">{sys.icon}</span>
        <span className="dt-subsystem-title">{sys.title}</span>
        <span className="dt-subsystem-chevron">{open ? "▲" : "▼"}</span>
      </button>

      {open && (
        <div className="dt-subsystem-body">
          {sys.items.map((item) => (
            <div key={item.label} className="dt-subsystem-item">
              <div className="dt-subsystem-item-label">{item.label}</div>
              <div className="dt-subsystem-item-detail">{item.detail}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function DigitalTwin() {
  return (
    <div id="digital-twin" className="page active">
      <section className="hero">
        <h1>Digital Twin</h1>
        <p>Explore the HIT station in real time — every module, every flow, every watt</p>
      </section>

      <div className="dt-container">
        <div className="dt-model-section">
          <div className="dt-model-header">
            <h2 className="dt-section-title">
              <span className="dt-section-icon">🏗️</span>
              HIT Station — Interactive 3D Model
            </h2>
            <div className="dt-model-badges">
              <span className="dt-badge dt-badge--cyan">Interactive</span>
              <span className="dt-badge dt-badge--orange">Drag to rotate</span>
            </div>
          </div>

          <div className="dt-model-wrapper">
            <Suspense fallback={<ModelLoader />}>
              <Canvas camera={{ position: [0, 1, 4], fov: 50 }}>
                <ambientLight intensity={0.5} />
                <directionalLight position={[5, 5, 5]} intensity={1} />
                <HitModel />
                <OrbitControls enablePan={false} minDistance={2} maxDistance={8} autoRotate autoRotateSpeed={0.5} />
                <Environment preset="city" />
              </Canvas>
            </Suspense>
            <div className="dt-model-hint">
              <span>👆</span> Hold &amp; drag to rotate
            </div>
          </div>
        </div>

        <div className="dt-overview-strip">
          {OVERVIEW_STATS.map(({ value, label, color }) => (
            <div key={label} className="dt-overview-card">
              <div className="dt-overview-value" style={{ color }}>{value}</div>
              <div className="dt-overview-label">{label}</div>
            </div>
          ))}
        </div>

        <div className="dt-arch-header">
          <h2 className="dt-section-title">
            <span className="dt-section-icon">⚙️</span>
            System Architecture &amp; Energy Flow
          </h2>
          <p className="dt-arch-lead">
            The HIT station implements a three-stage thermal cascade — each subsystem harvesting energy
            that would otherwise be discarded, feeding it downstream until the last joule is converted
            into usable power or data.
          </p>
        </div>

        <div className="dt-flow">
          {FLOW_NODES.map((node, i) => (
            <>
              <div key={node.label} className={`dt-flow-node dt-flow-node--${node.type}`}>
                <div className="dt-flow-node-icon">{node.icon}</div>
                <div className="dt-flow-node-label">{node.label}</div>
              </div>
              {i < FLOW_NODES.length - 1 && (
                <div key={`arrow-${i}`} className="dt-flow-arrow">→</div>
              )}
            </>
          ))}
        </div>

        <div className="dt-subsystems">
          {SUBSYSTEMS.map((sys) => (
            <SubsystemCard key={sys.id} sys={sys} />
          ))}
        </div>
      </div>
    </div>
  );
}
