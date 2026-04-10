import "../styles/Research.css";

const LOSS_CARDS = [
  { icon: "💨", title: "Exhaust Gas Heat Loss",      body: "Hot gases from combustion are vented directly into the sky." },
  { icon: "🌊", title: "Cooling System Heat Loss",   body: "Cooling towers dump heat into the environment, allowing steam to condense and be reused — but that steam is usable energy being released as it evaporates." },
  { icon: "🌡️", title: "Steam Condensation Heat Loss", body: "After steam spins a turbine it must be cooled back into water. The heat released in that process — often at 100–200°C — is simply discarded." },
  { icon: "🏭", title: "Stack Heat Loss",            body: "Incomplete combustion releases unburned fuel energy straight out of the stack." },
];

const STATS = [
  { value: "2×",    label: "projected electricity demand by 2035 vs. today" },
  { value: "~200",  label: "years of coal reserves remain at current consumption" },
  { value: "4%",    label: "annual efficiency improvement pledged at COP28 — currently falling short" },
];

const STEPS = [
  { num: "01", title: "Capture", body: "Steam exits the turbine at ~200°C — instead of sending that heat to a cooling tower, we channel it into a Stirling engine." },
  { num: "02", title: "Convert", body: "The Stirling engine — an external heat engine perfectly suited for moderate temperatures — converts that \"waste\" heat into additional electricity." },
  { num: "03", title: "Gain",    body: "Higher total efficiency, less fuel burned, lower emissions — all from the same input energy." },
];

const OUTCOMES = [
  { icon: "⚡", text: "Generate more electricity from the same fuel" },
  { icon: "🌿", text: "Extend the life of existing energy resources" },
  { icon: "🌍", text: "Reduce emissions without slowing growth" },
  { icon: "💰", text: "Keep energy costs stable for households and industry" },
];

const SOURCES = [
  "U.S. Energy Information Administration, \"After More Than a Decade of Little Change, U.S. Electricity Consumption Is Rising Again,\" May 13, 2025.",
  "International Energy Agency, \"Global Progress on Energy Efficiency Picks Up in 2025.\"",
  "Shea Winton, \"Global Energy Challenges in the 21st Century,\" Energy Innovation Magazine, no. 3 (Penn State, 2011).",
  "Karin Kirk, \"Energy Loss Is Single-Biggest Component of Today's Electricity System,\" Yale Climate Connections, October 24, 2022.",
  "U.S. Energy Information Administration, \"EIA Projects World Energy Use to Increase 53 Percent by 2035,\" press release, September 19, 2011.",
  "\"Thermal Power Plants,\" Prayogik, June 27, 2024.",
];

export default function Research() {
  return (
    <div id="research" className="page active">
      <section className="hero">
        <h1>Research</h1>
        <p>The science and motivation behind the Helios Project</p>
      </section>

      <div className="research-container">
        <div className="research-paper-header">
          <h2 className="research-paper-title">The Helios Project — Turning Waste Heat into Power</h2>
          <div className="research-meta">
            {["Energy Efficiency", "Stirling Engine", "Waste Heat Recovery"].map((tag) => (
              <span key={tag} className="research-meta-tag">{tag}</span>
            ))}
          </div>
        </div>

        <div className="research-section">
          <p className="research-lead">
            We live in an age of astonishing energy demand: data centers powering artificial intelligence,
            factories building the future, homes, hospitals, and entire nations rising to the challenge.
          </p>
          <p>
            In 2025, the United States generated 4.43 thousand terawatt-hours (TWh) of electricity — the
            highest total in the nation's history, up 2.8% from the previous record set just one year earlier.
            Globally, the race for AI and energy dominance is accelerating, and nations are scrambling to
            provide reliable power without making costs crippling for their companies or people.
          </p>
          <p>But there is a problem hiding in plain sight.</p>
          <div className="research-highlight-box">
            <span className="research-highlight-icon">⚡</span>
            <div>
              <strong>It takes energy to make energy.</strong>
              <p>
                And in that process, we lose most of it when we don't have to. In thermal power plants —
                the backbone of global electricity generation — <strong>56% to 67% of the energy</strong> that
                goes into them is lost in conversion.
              </p>
            </div>
          </div>
          <p>
            For every three units of fuel we burn, only one unit becomes usable electricity. The rest
            vanishes as heat from chimneys and out of cooling towers into the atmosphere. Mining, shipping,
            and burning fuel at tremendous cost results in throwing away more than half of its potential
            before it ever reaches a single lightbulb.
          </p>
        </div>

        <div className="research-section">
          <h3 className="research-section-heading">So, Where Does All That Energy Go?</h3>
          <p>When energy is lost, there are a few ways it disappears:</p>
          <div className="research-loss-grid">
            {LOSS_CARDS.map(({ icon, title, body }) => (
              <div key={title} className="research-loss-card">
                <div className="research-loss-icon">{icon}</div>
                <h4>{title}</h4>
                <p>{body}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="research-section">
          <h3 className="research-section-heading">A Pending Crisis</h3>
          <p>
            This inefficiency isn't just a technical footnote — it's a pending crisis in a world that
            needs more energy faster. Much of the recent and forecasted growth in electricity consumption
            is coming from the commercial sector (including data centers) and the industrial sector
            (including manufacturing).
          </p>
          <div className="research-stats-row">
            {STATS.map(({ value, label }) => (
              <div key={label} className="research-stat-box">
                <div className="research-stat-value">{value}</div>
                <div className="research-stat-label">{label}</div>
              </div>
            ))}
          </div>
          <p>
            At COP28 in Dubai in 2023, nearly 200 governments agreed to double the global average annual
            rate of energy efficiency improvements by 2030 — a 4% annual improvement. But globally, the
            rate of improvement currently falls well short of that target.
          </p>
          <p>
            Globally, we are running out of time and out of fuel while waiting for policy to catch up.
            But the technology already exists to recover that lost energy — and that's where the Helios
            idea comes in.
          </p>
        </div>

        <div className="research-section">
          <h3 className="research-section-heading">The Helios Solution: Stirling Engines</h3>
          <p>Installing a Stirling engine system atop a thermal power plant's exhaust streams works as follows:</p>
          <div className="research-steps">
            {STEPS.map(({ num, title, body }) => (
              <div key={num} className="research-step">
                <div className="research-step-num">{num}</div>
                <div className="research-step-body">
                  <strong>{title}</strong>
                  <p>{body}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="research-highlight-box research-highlight-box--green">
            <span className="research-highlight-icon">📈</span>
            <div>
              <strong>Even a 1–2% efficiency increase matters at scale.</strong>
              <p>
                Many thermal power plants operate at 30–40% efficiency. With waste heat recovery, they could
                reach <strong>50–60%</strong> — effectively generating the same electricity from far less fuel,
                whilst creating more energy for data centers, industry, and growing economies.
              </p>
            </div>
          </div>
        </div>

        <div className="research-section">
          <h3 className="research-section-heading">Stop Losing Energy. We Don't Have To.</h3>
          <p>
            The modern energy problem is not just about producing more power — it's about how efficiently
            we produce it. Every time we generate energy, we lose a significant portion in the process.
            Although this loss is not inevitable — it's rather an opportunity.
          </p>
          <p>
            The Stirling engine is a proven technology capable of capturing the heat we currently waste.
            By integrating Stirling systems into existing thermal power plants, we can:
          </p>
          <div className="research-outcomes">
            {OUTCOMES.map(({ icon, text }) => (
              <div key={text} className="research-outcome">
                <span className="research-outcome-icon">{icon}</span>
                <span>{text}</span>
              </div>
            ))}
          </div>
          <p className="research-closing">
            That is the Helios Project. This is the future we can build — starting now.
          </p>
        </div>

        <div className="research-sources">
          <h4>Sources</h4>
          <ol>
            {SOURCES.map((s, i) => <li key={i}>{s}</li>)}
          </ol>
        </div>
      </div>
    </div>
  );
}
