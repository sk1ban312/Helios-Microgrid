import serial
import json
import time
import firebase_admin
from firebase_admin import credentials
from firebase_admin import db

# --- SETUP ---
SERIAL_PORT = '/dev/ttyUSB0' 
BAUD_RATE = 9600

# Secure Firebase Auth
cred = credentials.Certificate("/home/helios/serviceAccountKey.json")
firebase_admin.initialize_app(cred, {
    'databaseURL': 'https://helios-project-668af-default-rtdb.firebaseio.com/'
})

print(f"Helios System: Connecting to Arduino on {SERIAL_PORT}...")

try:
    ser = serial.Serial(SERIAL_PORT, BAUD_RATE, timeout=1)
    time.sleep(2) 
    print("Connected! Sending data to Cloud...")

    while True:
        if ser.in_waiting > 0:
            # Read data and ignore EMI-induced garbage bytes
            line = ser.readline().decode('utf-8', errors='ignore').rstrip()
            try:
                data = json.loads(line)
                data['timestamp'] = int(time.time()) # Append UNIX timestamp
                
                # Push to Firebase
                db.reference('current_status').set(data) 
                db.reference('history').push(data)       
                
            except json.JSONDecodeError:
                pass # Gracefully skip corrupted JSON strings
            except Exception as e:
                print(f"!!! FIREBASE ERROR: {e}")
                
except KeyboardInterrupt:
    if 'ser' in locals(): ser.close()
except Exception as e:
    print(f"Connection Error: {e}. Check USB serial.")