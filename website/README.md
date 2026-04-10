## Overview

Helios is a full-stack React web platform for the Helios Combined Heat & Power (CHP) microgrid prototype — a three-stage thermal cascade system that captures waste heat and converts it into usable electricity.

The platform provides live sensor monitoring via Firebase, an interactive 3D digital twin, a financial model, a research paper, a news feed, and a DePIN crypto token page — all in a single responsive SPA.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18, React Router v6 |
| 3D Rendering | Three.js r183, @react-three/fiber, @react-three/drei |
| Live Data | Firebase Realtime Database (compat SDK v9) |
| Weather | Open-Meteo API (no API key required) |
| Build | Create React App 5 |
| Styling | Vanilla CSS, CSS custom properties |

---

## Features

| Feature | Detail |
|---|---|
| 📡 Live Sensor Dashboard | Real-time Firebase data across 19 sensor fields |
| 📈 Sparkline History Charts | Click any sensor row to expand a 30-point SVG chart — zero charting libraries |
| 🏗️ Interactive 3D Digital Twin | Drag-to-rotate GLTF model powered by React Three Fiber |
| 🌡️ °C / °F Toggle | Temperature unit propagated globally via React Context |
| 🎬 Video Lightbox | Custom HTML5 player — seek bar, volume, flash-indicator, ESC to close |
| ☀️ Weather Widget | Live Washington DC conditions from Open-Meteo |
| 📱 Responsive Design | GPU-accelerated mobile slide-in nav, tested on old Android |
| 💹 Financial Model | Budget tables, cash flow, ROI projections, risk matrix |
| 🪙 DePIN Token Page | $HELIOS tokenomics, live Birdeye price chart, world map |

---

## Project Structure

```
src/
├── assets/                  # Logos, icons, map image
├── components/              # Reusable UI components
│   ├── ExpandableSensorRow.jsx
│   ├── MiniChart.jsx
│   ├── Navbar.jsx
│   ├── ScrollToTopButton.jsx
│   ├── SensorItem.jsx
│   ├── StatCard.jsx
│   └── Footer.jsx
├── hooks/                   # Custom React hooks
│   ├── useClock.js
│   ├── useFirebase.js
│   ├── useFirebaseHistory.js
│   └── useWeather.js
├── pages/                   # Route-level page components
│   ├── Home.jsx
│   ├── Database.jsx
│   ├── DigitalTwin.jsx
│   ├── Finance.jsx
│   ├── Research.jsx
│   ├── Token.jsx
│   ├── News.jsx
│   ├── About.jsx
│   └── ComingSoon.jsx
├── styles/                  # Per-page CSS modules
├── App.jsx
└── index.js
public/
├── index.html               # Firebase CDN scripts
├── models/                  # Drop hit-station.glb here
└── news/                    # Drop news images & videos here
```

---

## Getting Started

### Prerequisites

- Node.js ≥ 16
- A Firebase project with Realtime Database enabled

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/sk1ban312/Helios-Microgrid.git
cd Helios-Microgrid/website

# 2. Install dependencies
npm install

# 3. Configure Firebase
#    Open src/hooks/useFirebase.js and fill in your project credentials:
#
#    const FIREBASE_CONFIG = {
#      apiKey:            "...",
#      authDomain:        "...",
#      databaseURL:       "...",
#      projectId:         "...",
#      ...
#    };

# 4. (Optional) Add your 3D model
#    Place hit-station.glb in public/models/

# 5. Start the dev server
npm start
```

The app will open at `http://localhost:3000`.

### Production Build

```bash
npm run build
```


## Pages

| Route | Description |
|---|---|
| `/` | Home — live power stats, system status, weather, social links |
| `/database` | Real-time sensor data with expandable sparkline history charts |
| `/digital-twin` | Interactive 3D model and system architecture accordion |
| `/about` | Project overview, features, and subsystem architecture |
| `/finance` | Budget breakdown, funding status, cash flow, and ROI model |
| `/token` | $HELIOS DePIN token, tokenomics pie chart, and world map |
| `/news` | Project milestones and updates with image/video lightbox |
| `/research` | Research paper on waste heat recovery and Stirling engines |

---

## Firebase Data Structure

The app listens to two nodes:

```
/current_status          ← live sensor snapshot (useFirebase.js)
  power_mw, total_v, total_c, sys_eff, timestamp
  temp_hot, rpm_ht, ht_p, ht_v, ht_c, ht_eff
  temp_mid, rpm_mt, mt_p, mt_v, mt_c, mt_eff
  teg_p, teg_v, teg_c

/history                 ← time-series for sparkline charts (useFirebaseHistory.js)
  <push_id>/
    timestamp: "2026-01-01T12:00:00"
    power_mw: 4.2
    ht_v: 1.3
    ...
```

