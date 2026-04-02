# 💻 Edge Computing & Software Engineering
**Project "Helios" — Cyber-Physical Data Pipeline**

![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)
![C++](https://img.shields.io/badge/C++-00599C?style=for-the-badge&logo=c%2B%2B&logoColor=white)
![Raspberry Pi](https://img.shields.io/badge/-RaspberryPi-C51A4A?style=for-the-badge&logo=Raspberry-Pi)
![Firebase](https://img.shields.io/badge/Firebase-039BE5?style=for-the-badge&logo=Firebase&logoColor=white)

This directory contains the core cyber-physical logic that bridges the gap between the physical mechanical prototype and our Cloud Digital Twin. 

## 📡 The IoT Data Pipeline Architecture
The system is designed to be **100% headless and autonomous**. It operates in a strict two-tier edge computing architecture:
1. **Tier 1 (Data Acquisition):** An Arduino/ESP32 reads physical sensors, multiplexes I2C buses, and packages raw data into JSON payloads.
2. **Tier 2 (Edge Gateway):** A Raspberry Pi 4 intercepts the JSON via USB Serial, filters electromagnetic interference (EMI) noise, appends UNIX timestamps, and securely pushes the data to Google Firebase.

---

## ⚙️ Tier 1: Microcontroller Firmware (`Helios_Sensors.ino`)
The firmware responsible for reading the physical state of the grid. 
* **I2C Multiplexing:** Utilizes a custom `SoftwareWire` implementation to run 4 identical INA219 sensors simultaneously without address collision.
* **Hardware Interrupts:** RPM is calculated using precise falling-edge hardware interrupts (`attachInterrupt`).
* **JSON Serialization:** All data is packaged into a highly optimized, lightweight `<ArduinoJson.h>` document to ensure zero data loss over serial transmission.

> **Note:** *The complete C++ source code is available in this directory as `Helios_Sensors.ino`.*

---

## 🍓 Tier 2: Raspberry Pi 4 Edge Gateway (`listen_arduino.py`)
The Raspberry Pi acts as the "Brain" of the physical installation. It operates completely headlessly, powered directly by the microgrid's 5V Power Bank reservoir.

### 1. Handling Electromagnetic Interference (EMI)
DC motors create massive electrical noise and magnetic fields, which occasionally corrupt the serial transmission bytes. To prevent the Python script from crashing due to `UnicodeDecodeError`, we implemented a robust byte-filtering catch:
```python
# Ignoring corrupted bytes caused by motor EMI before parsing JSON
line = ser.readline().decode('utf-8', errors='ignore').rstrip()
