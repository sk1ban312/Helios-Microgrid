import { useState } from "react";
import MiniChart from "./MiniChart";
import { useFirebaseHistory } from "../hooks/useFirebaseHistory";

function formatValue(value) {
  if (value == null) return "--";
  const n = Number(value);
  if (isNaN(n)) return String(value);
  if (Number.isInteger(n)) return n.toLocaleString("en-US");
  return n.toLocaleString("en-US", { minimumFractionDigits: 1, maximumFractionDigits: 2 });
}

function cToF(c) {
  return (c * 9) / 5 + 32;
}

export default function ExpandableSensorRow({
  label, value, unit, firebaseKey, accentColor, isTemp = false, tempUnit = "C",
}) {
  const [open, setOpen] = useState(false);
  const { points, loading } = useFirebaseHistory(firebaseKey, open);
  const displayPoints =
    isTemp && tempUnit === "F"
      ? points.map((p) => ({ ...p, value: cToF(p.value) }))
      : points;

  const toggle = () => setOpen((o) => !o);

  return (
    <div className={`sensor-item-wrap ${open ? "sensor-item-wrap--open" : ""}`}>
      <div
        className="sensor-item sensor-item--clickable"
        onClick={toggle}
        role="button"
        tabIndex={0}
        aria-expanded={open}
        onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && toggle()}
      >
        <span className="sensor-name">{label}</span>
        <div className="sensor-row-right">
          <div className="sensor-value">
            {formatValue(value)}
            {unit ? <span className="sensor-unit"> {unit}</span> : null}
          </div>
          <span
            className={`history-toggle ${open ? "history-toggle--open" : ""}`}
            aria-hidden="true"
          >
            ▶
          </span>
        </div>
      </div>

      {open && (
        <div className="history-panel">
          <div className="history-panel-label">Last 30 readings</div>
          <MiniChart points={displayPoints} color={accentColor} loading={loading} />
        </div>
      )}
    </div>
  );
}
