export function UrlMotit(gjeresi, gjatesi, opsion = {}) {
  const timezone = opsion.timezone || "Europe/Tirane";
  const diteKaluara = opsion.diteKaluara ?? 7;
  const diteParashikimi = opsion.diteParashikimi ?? 7;
  const daily = "temperature_2m_max,temperature_2m_min,weathercode";

  const search = new URLSearchParams({
    latitude: String(gjeresi),
    longitude: String(gjatesi),
    current_weather: "true",
    timezone,
    past_days: String(diteKaluara),
    forecast_days: String(diteParashikimi),
    daily,
  });

  return `https://api.open-meteo.com/v1/forecast?${search.toString()}`;
}
