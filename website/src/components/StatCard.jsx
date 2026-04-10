export default function StatCard({ label, value, unit, children }) {
  return (
    <div className="stat-card">
      <div className="stat-label">{label}</div>
      <div className="stat-value">
        <span>{value}</span>
        {unit && <span className="stat-unit">{unit}</span>}
      </div>
      {children}
    </div>
  );
}
