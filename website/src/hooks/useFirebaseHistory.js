import { useState, useEffect, useRef } from "react";

const HISTORY_LIMIT = 30;

export function useFirebaseHistory(firebaseKey, enabled) {
  const [points, setPoints] = useState([]);
  const [loading, setLoading] = useState(false);
  const listenerRef = useRef(null);

  useEffect(() => {
    if (!enabled) return;

    const firebase = window.firebase;
    if (!firebase || !firebase.apps?.length) return;

    setLoading(true);

    const ref = firebase.database()
      .ref("history")
      .orderByChild("timestamp")
      .limitToLast(HISTORY_LIMIT);

    const handler = (snapshot) => {
      const raw = snapshot.val();
      if (!raw) {
        setPoints([]);
        setLoading(false);
        return;
      }

      const parsed = Object.values(raw)
        .filter((entry) => entry[firebaseKey] != null)
        .map((entry) => ({
          time: entry.timestamp ? String(entry.timestamp).slice(11, 16) : "",
          value: Number(entry[firebaseKey]),
        }))
        .filter((p) => !isNaN(p.value));

      setPoints(parsed);
      setLoading(false);
    };

    ref.on("value", handler);
    listenerRef.current = { ref, handler };

    return () => listenerRef.current?.ref.off("value", listenerRef.current.handler);
  }, [firebaseKey, enabled]);

  return { points, loading };
}
