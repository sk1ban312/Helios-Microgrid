import { useState, useEffect } from "react";

const LAT = 38.9072;
const LON = -77.0369;
const LOCATION_NAME = "Washington, DC";

function weatherIcon(code) {
  if (code === 0)  return "☀️";
  if (code < 3)   return "⛅";
  if (code < 60)  return "🌧️";
  return "⛈️";
}

export function useWeather() {
  const [weather, setWeather] = useState({
    icon: "☀️",
    temp: "--",
    location: LOCATION_NAME,
    sunrise: "--",
    sunset: "--",
    error: null,
  });

  useEffect(() => {
    const url =
      `https://api.open-meteo.com/v1/forecast` +
      `?latitude=${LAT}&longitude=${LON}` +
      `&current_weather=true&daily=sunrise,sunset&timezone=auto`;

    fetch(url)
      .then((r) => r.json())
      .then((data) => setWeather({
        icon:     weatherIcon(data.current_weather.weathercode),
        temp:     Math.round(data.current_weather.temperature),
        location: LOCATION_NAME,
        sunrise:  data.daily.sunrise[0].split("T")[1],
        sunset:   data.daily.sunset[0].split("T")[1],
        error:    null,
      }))
      .catch(() => setWeather((prev) => ({ ...prev, error: "Weather unavailable" })));
  }, []);

  return weather;
}
