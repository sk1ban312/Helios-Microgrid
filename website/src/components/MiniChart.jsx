export default function MiniChart({ points = [], color = "#00d4ff", loading = false }) {
  const W = 500;
  const H = 90;
  const PAD = { top: 10, right: 8, bottom: 24, left: 36 };

  if (loading) {
    return (
      <div className="mini-chart-wrap mini-chart-loading">
        <div className="mini-chart-skeleton" />
      </div>
    );
  }

  if (!points.length) {
    return (
      <div className="mini-chart-wrap mini-chart-empty">
        No history data available
      </div>
    );
  }

  const values = points.map((p) => p.value);
  const minV = Math.min(...values);
  const maxV = Math.max(...values);
  const rangeV = maxV - minV || 1;
  const innerW = W - PAD.left - PAD.right;
  const innerH = H - PAD.top - PAD.bottom;

  const xOf = (i) => PAD.left + (i / (points.length - 1 || 1)) * innerW;
  const yOf = (v) => PAD.top + innerH - ((v - minV) / rangeV) * innerH;

  const pathD = points
    .map((p, i) => `${i === 0 ? "M" : "L"} ${xOf(i).toFixed(1)} ${yOf(p.value).toFixed(1)}`)
    .join(" ");

  const fillD =
    pathD +
    ` L ${xOf(points.length - 1).toFixed(1)} ${(PAD.top + innerH).toFixed(1)}` +
    ` L ${PAD.left.toFixed(1)} ${(PAD.top + innerH).toFixed(1)} Z`;

  const yTicks = [minV, minV + rangeV / 2, maxV].map((v) => ({
    label: v % 1 === 0
      ? v.toLocaleString("en-US", { maximumFractionDigits: 0 })
      : v.toLocaleString("en-US", { minimumFractionDigits: 1, maximumFractionDigits: 2 }),
    y: yOf(v),
  }));

  const xLabels = [
    { label: points[0].time,                x: PAD.left },
    { label: points[points.length - 1].time, x: W - PAD.right },
  ].filter((l) => l.label);

  const gradId = `grad-${color.replace(/[^a-z0-9]/gi, "")}`;

  return (
    <div className="mini-chart-wrap">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="xMidYMid meet"
        className="mini-chart-svg"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor={color} stopOpacity="0.35" />
            <stop offset="100%" stopColor={color} stopOpacity="0.02" />
          </linearGradient>
        </defs>

        {yTicks.map((t, i) => (
          <line
            key={i}
            x1={PAD.left} y1={t.y.toFixed(1)}
            x2={W - PAD.right} y2={t.y.toFixed(1)}
            stroke="rgba(255,255,255,0.07)"
            strokeWidth="1"
          />
        ))}

        <path d={fillD} fill={`url(#${gradId})`} />

        <path
          d={pathD}
          fill="none"
          stroke={color}
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        <circle
          cx={xOf(points.length - 1).toFixed(1)}
          cy={yOf(points[points.length - 1].value).toFixed(1)}
          r="3"
          fill={color}
        />

        {yTicks.map((t, i) => (
          <text
            key={i}
            x={(PAD.left - 4).toFixed(1)}
            y={(t.y + 4).toFixed(1)}
            textAnchor="end"
            fontSize="9"
            fill="rgba(255,255,255,0.45)"
          >
            {t.label}
          </text>
        ))}

        {xLabels.map((l, i) => (
          <text
            key={i}
            x={l.x.toFixed(1)}
            y={(H - 4).toFixed(1)}
            textAnchor={i === 0 ? "start" : "end"}
            fontSize="9"
            fill="rgba(255,255,255,0.45)"
          >
            {l.label}
          </text>
        ))}
      </svg>
    </div>
  );
}
