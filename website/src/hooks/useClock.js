import { useState, useEffect } from "react";

const DC_TIMEZONE = "America/New_York";

function getDCTime() {
  const now = new Date();
  return {
    timeString: now.toLocaleTimeString("en-US", {
      timeZone: DC_TIMEZONE,
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    }),
    dateString: now.toLocaleDateString("en-US", { timeZone: DC_TIMEZONE }),
  };
}

export function useClock() {
  const [display, setDisplay] = useState(getDCTime());

  useEffect(() => {
    const id = setInterval(() => setDisplay(getDCTime()), 1000);
    return () => clearInterval(id);
  }, []);

  return display;
}
