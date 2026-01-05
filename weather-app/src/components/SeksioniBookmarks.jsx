import React from "react";

export default function SeksioniBookmarks({ qyteteBookmark, weatherMap, removeFromBookmarks, diteParshikuar, setDiteParashikuar }) {
  return (
   <div className="card bookmark-card">
<div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
<div style={{ fontWeight: 800 }}> Bookmarks ({qyteteBookmark.length})</div>
        <div className="vogel">
        Ditet e parashikuara:
          <select value={diteParshikuar} onChange={e => setDiteParashikuar(Number(e.target.value))}>
            {[7,10,12,16].map(d => <option key={d} value={d}>{d} dite</option>)}
          </select>
        </div>
      </div>

      {qyteteBookmark.length === 0 ? (
<div className="empty" style={{ marginTop: 12 }}>
       Nuk ka bookmarks.</div>
      ) : (
        qyteteBookmark.map(qytet => {
          const w = weatherMap[qytet.id] 
       
          return (
            <div key={qytet.id} className="bookmark-city" style={{ border: "1px solid #ccc", margin: "10px 0", padding: "5px" }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div className="qytet-emri">{qytet.emri}, {qytet.shtet}</div>
                <button onClick={() => removeFromBookmarks(qytet.id)}>Remove ☆</button>
              </div>
              {w ? (
                <div>
                  <div>{parseInt(w.current_weather.temperature)}°C </div>
                  <data>{w.current_weather.time}</data>
                  <div className="vogel " style={{ marginTop: 5 }}>Ditet e parashikuara:</div>
                   
                     <div className="forecast-row">
                     {w.daily.time.slice(0, diteParshikuar).map((a, i) => (
                    <div key={a} className="forecast-card">
                      <div className="forecast-date">{a}</div>
                      <div className="vogel">Max: {parseInt(w.daily.temperature_2m_max[i])}°C</div>
                    <div className="vogel">Min: {parseInt(w.daily.temperature_2m_min[i])}°C</div>
                    </div>
                  ))}
                  </div>
                </div>
              ) : <div className="vogel">Po ngarkon...</div>}
            </div>
          );
        })
      )}
    </div>
  );
}
