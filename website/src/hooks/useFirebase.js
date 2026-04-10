import { useState, useEffect, useRef } from "react";

const FIREBASE_CONFIG = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_DOMAIN",
  databaseURL: "YOUR_DB_URL",
  projectId: "YOUR_PROJECT ID",
  storageBucket: "YOUR_STORAGE",
  messagingSenderId: "YOUR_ID",
  appId: "YOUR_ID",
  measurementId: "YOUR_ID"
};

function round3(value) {
  if (value === null || value === undefined || value === "") return "--";
  if (isNaN(value)) return value;
  return Math.round(Number(value) * 1000) / 1000;
}

export function useFirebase(enabled) {
  const [data, setData] = useState(null);
  const initialised = useRef(false);

  useEffect(() => {
    if (!enabled || initialised.current) return;
    initialised.current = true;

    const firebase = window.firebase;
    if (!firebase) {
      console.error("Firebase SDK not loaded. Add the CDN scripts to public/index.html.");
      return;
    }

    firebase.initializeApp(FIREBASE_CONFIG);
    const statusRef = firebase.database().ref("current_status");

    statusRef.on("value", (snapshot) => {
      const raw = snapshot.val();
      if (!raw) return;

      setData({
        powerMw:  round3(raw.power_mw),
        totalV:   round3(raw.total_v),
        totalC:   round3(raw.total_c),
        sysEff:   round3(raw.sys_eff),
        timestamp: raw.timestamp ?? "--",
        tempHot:  round3(raw.temp_hot),
        rpmHt:    round3(raw.rpm_ht),
        htP:      round3(raw.ht_p),
        htV:      round3(raw.ht_v),
        htC:      round3(raw.ht_c),
        htEff:    round3(raw.ht_eff),
        tempMid:  round3(raw.temp_mid),
        rpmMt:    round3(raw.rpm_mt),
        mtP:      round3(raw.mt_p),
        mtV:      round3(raw.mt_v),
        mtC:      round3(raw.mt_c),
        mtEff:    round3(raw.mt_eff),
        tegP:     round3(raw.teg_p),
        tegV:     round3(raw.teg_v),
        tegC:     round3(raw.teg_c),
      });
    });

    return () => statusRef.off();
  }, [enabled]);

  return data;
}
