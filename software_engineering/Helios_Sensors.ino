#include <Wire.h>
#include <SoftwareWire.h>
#include <INA219_WE.h>
#include "max6675.h"
#include <ArduinoJson.h>

INA219_WE ina_HT(0x40);

SoftwareWire wireMT(4, 5);
SoftwareWire wireTEG(6, 7);
SoftwareWire wireTotal(8, 9);

int common_CLK = 13;
int common_SO  = 12;
int cs_HT      = 10;
int cs_MT      = 11;
MAX6675 thermoHT(common_CLK, cs_HT, common_SO);
MAX6675 thermoMT(common_CLK, cs_MT, common_SO);
// --- RPM ---
volatile unsigned long count_HT = 0;
volatile unsigned long count_MT = 0;
unsigned long last_time = 0;
void counterHT() { count_HT++; }
void counterMT() { count_MT++; }

void initINA_Software(SoftwareWire &wire) {
wire.begin();
wire.beginTransmission(0x40);
wire.write(0x00); // Регистр конфигурации
wire.write(0x39); // Настройки: 32V, 320mV, 12-bit ADC
wire.write(0x9F); // Непрерывный режим
wire.endTransmission();
}
void readINA_Software(SoftwareWire &wire, float &v, float &c, float &p) {

wire.beginTransmission(0x40);
wire.write(0x02);
if (wire.endTransmission() != 0) { 
v = 0.0; c = 0.0; p = 0.0; return;
}
wire.requestFrom(0x40, 2);
uint16_t bus_raw = (wire.read() << 8) | wire.read();
float bus_v = (bus_raw >> 3) * 0.004;

wire.beginTransmission(0x40);
wire.write(0x01);
wire.endTransmission();
wire.requestFrom(0x40, 2);
int16_t shunt_raw = (wire.read() << 8) | wire.read();
float shunt_mv = shunt_raw * 0.01;

v = bus_v + (shunt_mv / 1000.0);
c = (shunt_mv * 10.0) / 1000.0;
p = v * c;

if (!isfinite(v)) v = 0.0;
if (!isfinite(c)) c = 0.0;
if (!isfinite(p)) p = 0.0;
}
// =========================================================================
void setup() {
Serial.begin(9600);
delay(1000);
Serial.println("SYSTEM START: HYBRID MODE");

Wire.begin();
ina_HT.init();

initINA_Software(wireMT);
initINA_Software(wireTEG);
initINA_Software(wireTotal);
pinMode(2, INPUT);
pinMode(3, INPUT);
attachInterrupt(digitalPinToInterrupt(2), counterHT, FALLING);
attachInterrupt(digitalPinToInterrupt(3), counterMT, FALLING);
}
void loop() {
if (millis() - last_time >= 1000) {
detachInterrupt(digitalPinToInterrupt(2));
detachInterrupt(digitalPinToInterrupt(3));
code
Code
int rpm_HT_val = count_HT * 60;
int rpm_MT_val = count_MT * 60;
count_HT = 0; count_MT = 0;
last_time = millis();

attachInterrupt(digitalPinToInterrupt(2), counterHT, FALLING);
attachInterrupt(digitalPinToInterrupt(3), counterMT, FALLING);


float t_hot = thermoHT.readCelsius();
float t_mid = thermoMT.readCelsius();
if (!isfinite(t_hot)) t_hot = 0;
if (!isfinite(t_mid)) t_mid = 0;
float t_room = 25.0;



// HT (через стандартную библиотеку, так как он на аппаратных A4/A5)
float v_ht = ina_HT.getBusVoltage_V() + (ina_HT.getShuntVoltage_mV() / 1000.0);
float c_ht = ina_HT.getCurrent_mA() / 1000.0;
float p_ht = v_ht * c_ht;
if (!isfinite(v_ht)) v_ht = 0; if (!isfinite(c_ht)) c_ht = 0; if (!isfinite(p_ht)) p_ht = 0;


float v_mt, c_mt, p_mt;
readINA_Software(wireMT, v_mt, c_mt, p_mt);

float v_teg, c_teg, p_teg;
readINA_Software(wireTEG, v_teg, c_teg, p_teg);

float v_tot, c_tot, p_tot;
readINA_Software(wireTotal, v_tot, c_tot, p_tot);


float ht_eff = 0; float mt_eff = 0; float sys_eff = 0;
if (t_hot > t_mid && t_hot > 0) ht_eff = (1.0 - ((t_mid + 273.15) / (t_hot + 273.15))) * 100.0;
if (t_mid > t_room && t_mid > 0) mt_eff = (1.0 - ((t_room + 273.15) / (t_mid + 273.15))) * 100.0;
if (t_hot > t_room && t_hot > 0) sys_eff = (1.0 - ((t_room + 273.15) / (t_hot + 273.15))) * 100.0;


StaticJsonDocument<768> doc;
doc["current_status"] = "measuring";
doc["timestamp"] = millis() / 1000;

doc["temp_hot"] = t_hot; doc["temp_mid"] = t_mid;
doc["rpm_ht"] = rpm_HT_val; doc["rpm_mt"] = rpm_MT_val;

doc["ht_v"] = v_ht; doc["ht_c"] = c_ht; doc["ht_p"] = p_ht; doc["ht_eff"] = ht_eff;
doc["mt_v"] = v_mt; doc["mt_c"] = c_mt; doc["mt_p"] = p_mt; doc["mt_eff"] = mt_eff;
doc["teg_v"] = v_teg; doc["teg_c"] = c_teg; doc["teg_p"] = p_teg;
doc["total_v"] = v_tot; doc["total_c"] = c_tot; doc["power_mw"] = p_tot;
doc["sys_eff"] = sys_eff;

serializeJson(doc, Serial);
Serial.println();
}
}