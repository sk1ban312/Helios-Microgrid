import "../styles/About.css";

const FEATURES = [
  {
    icon: "🔥",
    title: "Thermal Cascade",
    body: "Three-stage system: High-temperature Stirling engine → Medium-temperature Stirling engine → Thermoelectric generators",
  },
  {
    icon: "⚡",
    title: "Energy Management",
    body: "Intelligent power conditioning system with MT3608 converter and 10,000mAh power bank",
  },
  {
    icon: "🤖",
    title: "AI & IoT",
    body: "Raspberry Pi 4 with machine learning, Arduino Nano as sensor hub, real-time API and database",
  },
];

const ARCHITECTURE_BLOCKS = [
  {
    title: "Mechanical-Thermal Subsystem",
    points: [
      "Primary heat source powers a High-Temperature (HT) Stirling Engine",
      "Waste heat from HT engine is captured and channeled into a Medium-Temperature (MT) Stirling Engine",
      "Final-stage waste heat from MT engine is converted to electricity by Low-Temperature (LT) Thermoelectric Generators (TEGs)",
    ],
  },
  {
    title: "Electrical Power Subsystem",
    points: [
      "<strong>Generation:</strong> DC hobby motors attached to HT/MT engines and TEG array produce low-voltage, variable DC power",
      "<strong>Conditioning &amp; Charging:</strong> Power outputs are consolidated through Schottky diodes and fed into an MT3608 Boost Converter, outputting stable 5V DC",
      "<strong>Storage &amp; Distribution:</strong> Central 10,000mAh USB Power Bank ensures multi-hour operational runtime and provides stable 5V power",
    ],
  },
  {
    title: "Cyber-Physical & Data Subsystem",
    points: [
      "<strong>Sensing:</strong> Arduino Nano acts as dedicated sensor hub, collecting real-time data from all sensors",
      "<strong>Control &amp; Processing:</strong> Raspberry Pi 4 serves as the central brain, running data collection scripts, core API, database, and machine learning models",
    ],
  },
];

export default function About() {
  return (
    <div id="about" className="page active">
      <section className="hero">
        <h1>About Helios</h1>
        <p>Engineering the future of autonomous energy systems</p>
      </section>

      <div className="project-description">
        <h2>About the Helios Project</h2>
        <p>
          Helios is a fully autonomous, instrumented, and intelligent Combined Heat and Power (CHP)
          microgrid prototype. The project demonstrates the thermodynamic principle of thermal cascade,
          where thermal energy is utilized across multiple temperature levels, maximizing the efficiency
          of the entire system.
        </p>
        <p>
          This project serves not only as a demonstration of energy efficiency but also as a platform
          for developing cutting-edge skills in robotics, machine learning, cloud infrastructure, and
          financial technology (FinTech).
        </p>

        <div className="features">
          {FEATURES.map(({ icon, title, body }) => (
            <div key={title} className="feature-box">
              <h3>{icon} {title}</h3>
              <p>{body}</p>
            </div>
          ))}
        </div>

        <h2 className="section-heading">System Architecture</h2>

        {ARCHITECTURE_BLOCKS.map(({ title, points }) => (
          <div key={title} className="feature-box" style={{ marginTop: "20px" }}>
            <h3>{title}</h3>
            {points.map((point, i) => (
              <p key={i} dangerouslySetInnerHTML={{ __html: `• ${point}` }} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
