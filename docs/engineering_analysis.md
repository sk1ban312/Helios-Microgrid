# Engineering & Performance Analysis
**Project "Helios" — Combined Heat & Power (CHP) Microgrid**

## 1. Introduction & The Philosophy of "Engineering Honesty"
The purpose of this document is to provide a transparent, deep-dive analysis of the physical performance of the Helios prototype. While the cyber-physical integration, 3D Digital Twin, thermodynamic heat transfer, and FinTech models performed flawlessly, the mechanical-to-electrical energy conversion fell significantly short of our theoretical expectations.

As the Project Lead, I (Mykyta Skyba) take full responsibility for the miscalculations regarding the mechanical power output. This being my first major mechanical engineering project, the complexities of torque, mechanical impedance, and thermal dissipation were severely underestimated. This document details exactly *why* the physical generation was inefficient and what we learned.

---

## 2. Electrical Power Output: Expectations vs. Reality
Our initial goal was to generate enough continuous power to steadily charge a 10,000mAh power bank via an MT3608 boost converter (stepped up to 5V). 

| Metric | Expected Output | Actual Output (HT Prototype) |
| :--- | :--- | :--- |
| **Voltage (V)** | 5.0 V | 4.0 V |
| **Current (A)** | 0.01 A (10 mA) | 0.002 A (2 mA) |
| **Power (W)** | ~50 mW | ~8 mW |

**Conclusion on Power:** The only engine that produced measurable, real electrical output was the High-Temperature (HT) Stirling engine prototype. However, at **8mW**, the output is essentially parasitic and barely sufficient to register on standard multimeters, let alone power a functional grid.

---

## 3. The Mechanical Bottleneck: RPM, Torque, and Gear Ratios
The core reason for the low electrical output lies in the mismatch between the mechanical characteristics of a hobby-grade Stirling engine and the requirements of standard DC motors.

### 3.1 The RPM Deficit
Standard Type-130 hobby DC motors act as generators when driven mechanically. However, to produce a stable 3V–5V, they typically require a rotational speed of **~3000 RPM**. 
* The HT Stirling engine operated at roughly **100 RPM lower** than my absolute maximum theoretical calculations. 
* The baseline speed was simply too slow to induce a meaningful electromagnetic field in the DC motor coils.

### 3.2 The 1:5 Gear Ratio Failure
To compensate for the low RPM, we attempted to use a mechanical advantage: a larger driving wheel connected to a smaller pulley on the DC motor, creating a **1:5 gear ratio**.
* **Theory:** If the engine spins at 100 RPM, the motor shaft should spin at 500 RPM.
* **Reality (The Torque Problem):** Stirling engines of this scale produce incredibly low torque. The moment we attached the belt for the 1:5 ratio, the mechanical impedance (friction of the belt, magnetic resistance of the DC motor's magnets) completely overcame the engine's torque. The engine stalled. 

### 3.3 MT Engine Structural Unreliability
The Medium-Temperature (MT) engine, designed to run off the captured waste heat, suffered from structural instability. The internal friction of its moving parts was too high relative to the low thermal energy it received, resulting in unreliable continuous motion and zero net electrical generation.

---

## 4. Thermodynamics & The TEG Temperature Delta ($\Delta T$)
To capture the final stage of waste heat, we mounted Low-Temperature Thermoelectric Generators (TEGs) to the sides of a **custom-machined aluminum heat transfer block**.

TEGs operate on the **Seebeck effect**, which generates voltage based strictly on the temperature difference ($\Delta T$) between the hot side and the cold side of the ceramic module.
* **The Hot Side:** The custom aluminum block successfully conducted heat from the HT radiators to the TEGs.
* **The Cold Side (The Failure):** We utilized small, passive aluminum heatsinks to cool the outer side of the TEGs.
* **The Result:** The small heatsinks were completely inadequate for dissipating the heat. They quickly reached thermal equilibrium with the hot side. As $\Delta T$ approached zero, the voltage output of the TEGs dropped to near zero. A much larger, potentially active (water-cooled or fan-cooled) system was required.

---

## 5. Project Lead's Conclusion & V2.0 Improvements
The Helios project was a massive success in systems integration, IoT, data streaming, and FinTech modeling. However, physically, it served as a harsh but invaluable lesson in mechanical engineering constraints.

**If we were to build Helios V2.0, the following physical changes are mandatory:**
1. **Custom Low-Friction Alternators:** We cannot use off-the-shelf DC motors. We must design coreless axial flux generators with neodymium magnets that offer near-zero "cogging" torque and generate power at very low RPMs (100–300 RPM).
2. **Active Cooling Loop:** The TEGs require a dedicated cold-water loop or significantly larger, high-surface-area finned heatsinks to maintain a high $\Delta T$.
3. **High-Torque Engines:** Transitioning from alpha/beta kinematic Stirling engines to a Free-Piston Stirling Engine (FPSE) design equipped with a linear alternator would eliminate rotational friction entirely.

*Authored by: Mykyta Skyba (Project Lead & Lead Systems Architect)*
