import "../styles/Finance.css";

function FinStat({ value, label, sub, color }) {
  return (
    <div className="fin-stat" style={{ "--fin-accent": color || "var(--accent)" }}>
      <div className="fin-stat-value">{value}</div>
      <div className="fin-stat-label">{label}</div>
      {sub && <div className="fin-stat-sub">{sub}</div>}
    </div>
  );
}

function FinTable({ headers, rows, footerRow }) {
  return (
    <div className="fin-table-wrap">
      <table className="fin-table">
        <thead>
          <tr>{headers.map((h, i) => <th key={i}>{h}</th>)}</tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className={row[0]?.startsWith("**") ? "fin-row-bold" : ""}>
              {row.map((cell, j) => (
                <td key={j}>{typeof cell === "string" ? cell.replace(/\*\*/g, "") : cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
        {footerRow && (
          <tfoot>
            <tr className="fin-row-total">
              {footerRow.map((cell, i) => <td key={i}>{cell}</td>)}
            </tr>
          </tfoot>
        )}
      </table>
    </div>
  );
}

function FinSection({ id, title, children }) {
  return (
    <div className="fin-section" id={id}>
      <h2 className="fin-section-title">{title}</h2>
      {children}
    </div>
  );
}

const HIGHLIGHTS = [
  { value: "$41,580",  label: "Total Project Budget",  sub: "Full lifecycle" },
  { value: "$25,000",  label: "Funding Secured",       sub: "60% of target",       color: "#48bb78" },
  { value: "$16,580",  label: "Funding Gap",           sub: "Active fundraising",  color: "#fc8181" },
  { value: "285%",     label: "Projected ROI (3yr)",   sub: "Conservative case",   color: "#f6ad55" },
  { value: "18 mo.",   label: "Payback Period",        sub: "Post-deployment",     color: "#a78bfa" },
  { value: "$118K+",   label: "Value Potential",       sub: "3-year horizon",      color: "#00d4ff" },
];

const BUDGET_CARDS = [
  {
    icon: "🔩", amount: "$12,400", name: "Hardware & Components",
    desc: "Stirling engine, sensors, power electronics, mechanical fabrication. Supplier quotes locked in with 4.8% variance buffer.",
  },
  {
    icon: "☁️", amount: "$4,200", name: "Software & Cloud",
    desc: "ML platform, AWS/GCP services, dev tools. Free-tier thresholds leveraged to minimise ongoing cloud burn.",
  },
  {
    icon: "👷", amount: "$18,000", name: "Labor & Personnel",
    desc: "Engineering team stipends, faculty advisor retainer, specialist consultants. Fixed-scope deliverables per quarter.",
  },
  {
    icon: "🛡️", amount: "$3,780", name: "Contingency Reserve (10%)",
    desc: "Held separately, subject to change control. Unspent funds reallocated to Phase 2.",
  },
];

const BUDGET_ROWS = [
  ["**Hardware & Components**",       "$12,400", "$11,800", "$600", "4.8%"],
  ["Stirling Engine & Thermal System","$5,200",  "$5,000",  "$200", "3.8%"],
  ["Sensors, Instrumentation & MCUs", "$3,800",  "$3,600",  "$200", "5.3%"],
  ["Power Electronics & Storage",     "$2,100",  "$2,000",  "$100", "4.8%"],
  ["Mechanical Fabrication & Parts",  "$1,300",  "$1,200",  "$100", "7.7%"],
  ["**Software & Cloud Infrastructure**", "$4,200", "$4,000", "$200", "4.8%"],
  ["ML Platform & Model Training",    "$1,800",  "$1,800",  "$0",   "0.0%"],
  ["Cloud Services (AWS/GCP)",        "$1,600",  "$1,500",  "$100", "6.3%"],
  ["Dev Tools & Licenses",            "$800",    "$700",    "$100", "12.5%"],
  ["**Labor & Personnel**",           "$18,000", "$17,500", "$500", "2.8%"],
  ["Engineering Team (Part-time)",    "$12,000", "$12,000", "$0",   "0.0%"],
  ["Faculty Advisor Stipend",         "$3,600",  "$3,500",  "$100", "2.8%"],
];

const QUARTERS = [
  { q: "Q1 2026", phase: "Foundation",   flow: "+$5,800",  color: "#48bb78", desc: "$20,000 secured and deployed. Largest positive net cash flow as the university grant arrives before major spend." },
  { q: "Q2 2026", phase: "Development",  flow: "($4,400)", color: "#fc8181", desc: "Most capital-intensive period. Peak engineering activity absorbed by Q1 surplus, cumulative balance stays positive." },
  { q: "Q3 2026", phase: "Validation",   flow: "($600)",   color: "#f6ad55", desc: "Prototype moves to testing and refinement. Remaining sponsor and crowdfunding income expected." },
  { q: "Q4 2026", phase: "Demonstration",flow: "($800)",   color: "#f6ad55", desc: "Final demonstration and deployment. Budget fully deployed by year-end with zero residual." },
];

export default function Finance() {
  return (
    <div className="page active fin-page">
      <section className="hero">
        <h1>Financial Overview</h1>
        <p>Project Helios — Business Case &amp; Financial Model · FY2026</p>
      </section>

      <div className="fin-highlights">
        {HIGHLIGHTS.map((h) => <FinStat key={h.label} {...h} />)}
      </div>

      <FinSection id="budget" title="01 | Project Budget & Cost Breakdown">
        <p className="fin-prose">
          The Helios project budget was developed through a rigorous bottom-up cost estimation process
          drawing on confirmed supplier quotations, UET laboratory benchmarks, and comparable academic
          engineering projects. The total allocation of <strong>$41,580</strong> covers the full project
          lifecycle — from initial design and hardware procurement through software integration, ML model
          training, prototype testing, and final public demonstration at end of FY2026.
        </p>
        <div className="fin-budget-cards">
          {BUDGET_CARDS.map(({ icon, amount, name, desc }) => (
            <div key={name} className="fin-budget-card">
              <div className="fin-budget-icon">{icon}</div>
              <div className="fin-budget-amount">{amount}</div>
              <div className="fin-budget-name">{name}</div>
              <div className="fin-budget-desc">{desc}</div>
            </div>
          ))}
        </div>
        <FinTable
          headers={["Cost Category", "Budgeted", "Actual / Est.", "Variance", "Var %"]}
          rows={BUDGET_ROWS}
          footerRow={["TOTAL", "$41,580", "$40,580", "$1,000", "2.4%"]}
        />
      </FinSection>

      <FinSection id="funding" title="02 | Funding Sources & Status">
        <p className="fin-prose">
          Helios uses a diversified funding strategy — no single source exceeds 40% of total. The
          University Engineering Grant is confirmed and serves as the anchor commitment. NSF SBIR Phase 0
          is pending, and corporate sponsor negotiations are underway.
        </p>
        <FinTable
          headers={["Funding Source", "Amount", "Status", "Expected Date"]}
          rows={[
            ["University Engineering Grant", "$15,000", "✅ Confirmed",     "Q1 2026"],
            ["NSF SBIR Phase 0",             "$10,000", "⏳ Pending",       "Q2 2026"],
            ["Corporate Sponsor (TBD)",      "$8,000",  "🤝 In Negotiation","Q2 2026"],
            ["Team Contributions",           "$5,000",  "✅ Confirmed",     "Q1 2026"],
            ["Crowdfunding / Community",     "$2,000",  "🎯 Target",        "Q3 2026"],
            ["Equipment Donations (In-Kind)","$1,580",  "✅ Confirmed",     "Ongoing"],
          ]}
          footerRow={["TOTAL FUNDING TARGET", "$41,580", "60% Secured", "—"]}
        />
      </FinSection>

      <FinSection id="cashflow" title="03 | Cash Flow & P&L Statement (FY2026)">
        <p className="fin-prose">
          The Helios cash flow model is structured around four discrete development phases aligned with
          calendar quarters. Capital is deployed efficiently — major procurement occurs only once funding
          is confirmed. The project maintains a positive or neutral cumulative balance throughout FY2026.
        </p>
        <div className="fin-quarters">
          {QUARTERS.map(({ q, phase, flow, color, desc }) => (
            <div key={q} className="fin-quarter-card" style={{ "--q-color": color }}>
              <div className="fin-quarter-header">
                <span className="fin-quarter-label">{q}</span>
                <span className="fin-quarter-phase">{phase}</span>
                <span className="fin-quarter-flow" style={{ color }}>{flow}</span>
              </div>
              <p className="fin-quarter-desc">{desc}</p>
            </div>
          ))}
        </div>
        <FinTable
          headers={["Period", "Funding In", "Expenditures", "Net Cash Flow", "Cumulative Balance"]}
          rows={[
            ["Q1 2026", "$20,000", "$14,200", "+$5,800",  "$5,800"],
            ["Q2 2026", "$12,000", "$16,400", "($4,400)", "$1,400"],
            ["Q3 2026", "$7,000",  "$7,600",  "($600)",   "$800"],
            ["Q4 2026", "$2,580",  "$3,380",  "($800)",   "$0"],
          ]}
          footerRow={["FULL YEAR", "$41,580", "$41,580", "$0", "$0 (Fully Deployed)"]}
        />
      </FinSection>

      <FinSection id="roi" title="04 | Financial Model & Return on Investment">
        <p className="fin-prose">
          The $41,580 investment in FY2026 creates multiple value pathways with a combined 3-year potential
          of <strong>$118,400 to $392,000</strong> — a conservative-to-upside ROI range of 185% to 843%.
          Technology licensing represents the highest-potential pathway; energy cost savings provide the
          most immediate return.
        </p>
        <FinTable
          headers={["Revenue / Benefit Stream", "Description", "Estimated Value"]}
          rows={[
            ["Energy Cost Savings (Annual)",  "Reduced grid dependency via CHP",          "$8,400 – $12,000"],
            ["Technology Licensing Potential","Patentable thermal cascade controls",       "$25,000 – $80,000"],
            ["Grant & Award Revenue",         "NSF, DOE, university competitions",         "$15,000 – $40,000"],
            ["Commercial Prototype Sales",    "Scaled CHP units for SMBs",                "$50,000 – $200,000"],
            ["Research Partnerships",         "Industry co-development agreements",        "$20,000 – $60,000"],
          ]}
          footerRow={["3-YEAR TOTAL VALUE POTENTIAL", "Conservative estimate", "$118,400 – $392,000"]}
        />
      </FinSection>

      <FinSection id="risks" title="05 | Financial Risk & Mitigation">
        <p className="fin-prose">
          No single risk, if materialised, would be sufficient to halt the project. The combination of
          diversified funding, locked procurement costs, and a 10% contingency reserve provides layered
          protection.
        </p>
        <FinTable
          headers={["Risk Factor", "Likelihood", "Mitigation Strategy", "Financial Impact"]}
          rows={[
            ["Funding gap not filled",              "Medium", "Active grant applications + corporate outreach; 10% contingency buffer", "Up to ($16,580)"],
            ["Hardware cost overrun",               "Low",    "Locked supplier quotes; phased procurement strategy",                   "Up to ($3,000)"],
            ["Timeline delays (labor cost)",        "Medium", "Agile management; fixed-scope milestones per quarter",                  "Up to ($4,500)"],
            ["IP monetization slower than projected","Medium", "Multiple revenue streams reduce dependency on single pathway",         "Delay 6–12 mo."],
            ["Sponsor withdrawal",                  "Low",    "Diversified funding: no single source >40% of total",                  "Up to ($8,000)"],
          ]}
        />
        <p className="fin-disclaimer">
          This document contains forward-looking financial projections. All estimates are based on current
          market data and team assumptions as of FY2026. Actual results may differ materially.
        </p>
      </FinSection>
    </div>
  );
}
