import React from "react";

export default function DetajeQyteti({ qytet, weather, ToggleBookmark, Bookmark }) {
  return (
    <div className="card">
      <div style={{ display: "flex", justifyContent: "space-between" }}>
<div>
          <div className="qytet-emri">{qytet.emri}, {qytet.shtet}</div>
          
        </div>
        <button onClick={ToggleBookmark}>{Bookmark ? "★" : "☆"}</button>
      </div>
      {weather ? (
        <div style={{ marginTop: 15 }}>
          <div style={{ fontSize: 34, fontWeight: 700 }}>
          <div className=" time-code">{parseInt(weather.current_weather.temperature)}°C</div>
          <div className="vogel">
      Min: {Math.round(weather.daily.temperature_2m_min[0])}°C • 
      Max: {Math.round(weather.daily.temperature_2m_max[0])}°C
    </div>
          <div className="code-1">Kodi: {weather.current_weather.weathercode} — {weather.current_weather.time}</div>
        </div>
        </div>
      ) : (
        <div className="vogel">Po ngarkon....</div>
      )}
    </div>
  );
}
