# Engineering & Performance Analysis
**Project "Helios" — Combined Heat & Power (CHP) Microgrid**

## 1. Introduction & The Philosophy of "Engineering Honesty"
The purpose of this document is to provide a transparent, deep-dive analysis of the physical performance of the Helios prototype. While the cyber-physical integration, 3D Digital Twin, thermodynamic heat transfer, and FinTech models performed flawlessly, the mechanical-to-electrical energy conversion fell significantly short of our theoretical expectations.

As the Project Lead, I (Mykyta Skyba) take full responsibility for the miscalculations regarding the mechanical power output. This being my first major mechanical engineering project, the complexities of torque, mechanical impedance, and thermal dissipation were severely underestimated. This document details exactly *why* the physical generation was inefficient and what we learned.

---

## 2. Thermodynamic Efficiency & Energy Loss Analysis
To understand the true efficiency of the system, we must compare the potential thermal energy of the fuel against the final electrical output.

**The Fuel Input (Thermal Power):**
* **Fuel Source:** Denatured Alcohol (Ethanol).
* **Burn Rate:** 20 ml consumed over a 15-minute (900 seconds) run.
* **Density of Ethanol:** ~0.789 g/ml $\rightarrow$ Mass = 15.78 g (0.01578 kg).
* **Lower Heating Value (LHV):** ~26.8 MJ/kg.
* **Total Thermal Energy:** $0.01578 \text{ kg} \times 26,800,000 \text{ J/kg} \approx \textbf{422,900 Joules}$.
* **Average Thermal Power Input:** $422,900 \text{ J} / 900 \text{ s} \approx \textbf{470 Watts}$.

**The Electrical Output (HT Prototype):**
* **Measured Output:** 4.0 V at 0.002 A.
* **Electrical Power:** $\textbf{0.008 Watts (8 mW)}$.

**System Efficiency ($\eta$):**
$$ \eta = \frac{P_{out}}{P_{in}} = \frac{0.008 \text{ W}}{470 \text{ W}} \times 100\% \approx \textbf{0.0017\%} $$

*Conclusion:* The system dissipates nearly 99.998% of its energy as uncaptured heat, mechanical friction, and thermal radiation. The HT engine, while functional, acts mostly as a parasitic load rather than a viable generator.

---

## 3. The Mechanical Bottleneck: MT Engine & Gear Ratio Failure
While the HT engine produced a tiny trickle of power, the Medium-Temperature (MT) engine completely failed to drive the DC motor. The math reveals exactly why:

**The Kinematic Setup:**
* MT Engine Flywheel Radius ($R_{MT}$) = **5 cm**
* DC Motor Pulley Radius ($R_{DC}$) = **1 cm**
* **Gear Ratio:** 1:5 (Motor shaft spins 5 times for every 1 MT revolution).
* **MT Engine Unloaded Speed:** **~100 RPM**.

**1. The RPM Deficit:**
With a 1:5 ratio, an unloaded MT engine at 100 RPM would spin the DC motor at **500 RPM**. However, standard Type-130 DC motors require **~3000 RPM** to overcome internal resistance and generate a stable 3V-5V. Even theoretically, we were operating at 1/6th of the required speed.

**2. The Torque ($\tau$) Collapse:**
In gear systems, speed increases at the direct expense of torque: 
$$ \tau_{DC} = \frac{\tau_{MT}}{5} $$
Stirling engines at this scale produce extremely low torque. By dividing this already minuscule torque by 5, the rotational force applied to the DC motor shaft dropped to near zero. The magnetic "cogging" force of the DC motor's permanent magnets and the friction of the drive belt were far greater than $\tau_{DC}$. As a result, attaching the belt instantly stalled the MT engine.

---

## 4. Conclusion & Forward Engineering
As an Electrical Engineer, this project was a profound learning experience. It taught me a humbling truth: **Mechanical engineering and thermodynamics are incredibly unforgiving.** While our electrical logic, sensor communication, and cloud pipelines worked perfectly, the physical mechanical execution was our bottleneck. 

If I were to design "Helios V2.0", the entire approach would change:
1. **Complete Custom Engine Design:** Instead of relying on off-the-shelf hobby engines, I would machine the Stirling engines from scratch. Understanding the deep mechanics of piston friction, displacement volumes, and heat transfer is mandatory for true efficiency.
2. **Custom PCB Integration:** I would replace the breadboards and generic modules with a custom-designed printed circuit board (PCB) to handle the ESP32 logic, step-up converters, and power management in one streamlined, low-resistance hardware package.
3. **Optimized Thermal Design:** The system would feature actively cooled TEGs and perfectly insulated heat pathways to minimize the massive thermal losses calculated above.

---

## 5. Project Lead's Conclusion & V2.0 Improvements
The Helios project was a massive success in systems integration, IoT, data streaming, and FinTech modeling. However, physically, it served as a harsh but invaluable lesson in mechanical engineering constraints.

**If we were to build Helios V2.0, the following physical changes are mandatory:**
1. **Custom Low-Friction Alternators:** We cannot use off-the-shelf DC motors. We must design coreless axial flux generators with neodymium magnets that offer near-zero "cogging" torque and generate power at very low RPMs (100–300 RPM).
2. **Active Cooling Loop:** The TEGs require a dedicated cold-water loop or significantly larger, high-surface-area finned heatsinks to maintain a high $\Delta T$.
3. **High-Torque Engines:** Transitioning from alpha/beta kinematic Stirling engines to a Free-Piston Stirling Engine (FPSE) design equipped with a linear alternator would eliminate rotational friction entirely.

*Authored by: Mykyta Skyba (Project Lead & Lead Systems Architect)*
