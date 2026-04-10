import { useState, createContext, useContext } from "react";
import ExpandableSensorRow from "../components/ExpandableSensorRow";
import "../styles/Database.css";

export const TempUnitContext = createContext("C");

function toF(c) {
  if (c == null || c === "--" || isNaN(Number(c))) return c;
  return (Number(c) * 9 / 5 + 32).toFixed(1);
}

function Block({ emoji, title, subtitle, accent, children }) {
  return (
    <div className="db-block" style={{ "--block-accent": accent }}>
      <h2 className="db-block-title">
        <span className="db-block-emoji">{emoji}</span>
        {title}
      </h2>
      {subtitle && <p className="db-block-subtitle">{subtitle}</p>}
      <div className="sensor-grid">{children}</div>
    </div>
  );
}

function Row({ label, value, unit, firebaseKey, accent }) {
  const tempUnit = useContext(TempUnitContext);
  const isTemp = unit === "°C";
  const displayValue = isTemp && tempUnit === "F" ? toF(value) : value;
  const displayUnit = isTemp && tempUnit === "F" ? "°F" : unit;

  return (
    <ExpandableSensorRow
      label={label}
      value={displayValue}
      unit={displayUnit}
      firebaseKey={firebaseKey}
      accentColor={accent}
      isTemp={isTemp}
      tempUnit={tempUnit}
    />
  );
}

function TempToggle({ unit, onChange }) {
  return (
    <div className="temp-toggle-wrap">
      <span className="temp-toggle-label">Temperature:</span>
      <div className="temp-toggle">
        {["C", "F"].map((u) => (
          <button
            key={u}
            className={`temp-toggle-btn ${unit === u ? "active" : ""}`}
            onClick={() => onChange(u)}
          >
            °{u}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function Database({ firebaseData }) {
  const d = firebaseData ?? {};
  const [tempUnit, setTempUnit] = useState("C");

  return (
    <TempUnitContext.Provider value={tempUnit}>
      <div id="database" className="page active">
        <section className="hero">
          <h1>System Database</h1>
          <p>Real-time sensor data and energy flow monitoring</p>
        </section>

        <TempToggle unit={tempUnit} onChange={setTempUnit} />

        <Block
          emoji="☀️"
          title="MAIN BUS / OVERALL SYSTEM"
          subtitle="The primary block showing total output going into the Power Bank — the end result of the entire system."
          accent="var(--accent)"
        >
          <Row label="Total Power"               value={d.powerMw} unit="W"  firebaseKey="power_mw" accent="#00d4ff" />
          <Row label="Total Voltage"             value={d.totalV}  unit="V"  firebaseKey="total_v"  accent="#00d4ff" />
          <Row label="Total Current"             value={d.totalC}  unit="A"  firebaseKey="total_c"  accent="#00d4ff" />
          <Row label="System Potential (Carnot)" value={d.sysEff}  unit="%"  firebaseKey="sys_eff"  accent="#00d4ff" />
        </Block>

        <div className="db-three-col">
          <Block
            emoji="🔥"
            title="Stage 1: HT Engine"
            subtitle="The first high-temperature engine — the hottest cascade in the system."
            accent="#ff6b35"
          >
            <Row label="Temperature"       value={d.tempHot} unit="°C"  firebaseKey="temp_hot" accent="#ff6b35" />
            <Row label="RPM"               value={d.rpmHt}   unit="rpm" firebaseKey="rpm_ht"   accent="#ff6b35" />
            <Row label="Power"             value={d.htP}     unit="W"   firebaseKey="ht_p"     accent="#ff6b35" />
            <Row label="Voltage"           value={d.htV}     unit="V"   firebaseKey="ht_v"     accent="#ff6b35" />
            <Row label="Current"           value={d.htC}     unit="A"   firebaseKey="ht_c"     accent="#ff6b35" />
            <Row label="Carnot Efficiency" value={d.htEff}   unit="%"   firebaseKey="ht_eff"   accent="#ff6b35" />
          </Block>

          <Block
            emoji="🪛"
            title="Stage 2: MT Engine"
            subtitle="The second engine consuming waste heat from the first stage."
            accent="#f6ad55"
          >
            <Row label="Temperature"       value={d.tempMid} unit="°C"  firebaseKey="temp_mid" accent="#f6ad55" />
            <Row label="RPM"               value={d.rpmMt}   unit="rpm" firebaseKey="rpm_mt"   accent="#f6ad55" />
            <Row label="Power"             value={d.mtP}     unit="W"   firebaseKey="mt_p"     accent="#f6ad55" />
            <Row label="Voltage"           value={d.mtV}     unit="V"   firebaseKey="mt_v"     accent="#f6ad55" />
            <Row label="Current"           value={d.mtC}     unit="A"   firebaseKey="mt_c"     accent="#f6ad55" />
            <Row label="Carnot Efficiency" value={d.mtEff}   unit="%"   firebaseKey="mt_eff"   accent="#f6ad55" />
          </Block>

          <Block
            emoji="❄️"
            title="Stage 3: TEG Array"
            subtitle="Thermoelectric plates generating current from residual heat. No moving parts — no RPM or efficiency rating."
            accent="#48bb78"
          >
            <Row label="Power"   value={d.tegP} unit="W" firebaseKey="teg_p" accent="#48bb78" />
            <Row label="Voltage" value={d.tegV} unit="V" firebaseKey="teg_v" accent="#48bb78" />
            <Row label="Current" value={d.tegC} unit="A" firebaseKey="teg_c" accent="#48bb78" />
          </Block>
        </div>
      </div>
    </TempUnitContext.Provider>
  );
}
