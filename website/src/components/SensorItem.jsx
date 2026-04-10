export default function SensorItem({ name, value, unit }) {
  return (
    <div className="sensor-item">
      <span className="sensor-name">{name}</span>
      <div className="sensor-value">
        {value ?? "--"}
        {unit && ` ${unit}`}
      </div>
    </div>
  );
}
