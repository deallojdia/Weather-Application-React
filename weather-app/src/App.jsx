import React, { useState, useEffect } from "react";
import { UrlMotit } from "./utils/api";
import DetajeQyteti from "./components/DetajeQyteti";
import SeksioniBookmarks from "./components/SeksioniBookmarks";
import { qyteteShqiptare } from "./data/qytete";
import "./App.css";

export default function App() {
  const [hartaMoti, setHartaMoti] = useState({});
  const [bookmarks, setBookmarks] = useState(() =>
    JSON.parse(localStorage.getItem("alb_weather_bookmarks") || "[]")
  );
  const [inputTerm, setInputTerm] = useState("");
  const [activeTab, setActiveTab] = useState("qytete");
  const [diteParashikuar, setDiteParashikuar] = useState(7);

  useEffect(() => {
    localStorage.setItem(
      "alb_weather_bookmarks",
      JSON.stringify(bookmarks)
    );
  }, [bookmarks]);

  async function Moti(qytet, dite = 7) {
    try {
      const url = UrlMotit(qytet.gjeresi, qytet.gjatesi, {
        diteParashikimi: dite,
        diteKaluara: 7,
      });
      const res = await fetch(url);
      const data = await res.json();


      setHartaMoti(prev => ({
        ...prev,
        [qytet.id]: data,
      }));
    } catch (e) {
      console.error("Gabim në marrjen e motit:", qytet.emri);
    }
  }

  useEffect(() => {
    qyteteShqiptare.forEach(q =>
      Moti(q, diteParashikuar)
    );
  }, [diteParashikuar]);

  const qyteteFiltruara = qyteteShqiptare.filter(q =>
    q.emri.toLowerCase().includes(inputTerm.toLowerCase())
  );

  const qyteteBookmark = bookmarks
    .map(id => qyteteShqiptare.find(q => q.id === id))
    .filter(Boolean);

  function toggleBookmark(id) {
    setBookmarks(prev =>
      prev.includes(id)
        ? prev.filter(b => b !== id)
        : [...prev, id]
    );
  }

  return (
    <div className="app">
      <h1 className="app-title">Moti</h1>

       <div className="tabs-container">
        <button
          className={`tab-btn ${activeTab === "qytete" ? "active" : ""}`}
          onClick={() => setActiveTab("qytete")}
        >
          Qytete
        </button>
        <button
          className={`tab-btn ${activeTab === "bookmarks" ? "active" : ""}`}
          onClick={() => setActiveTab("bookmarks")}
        >
          Bookmarks
        </button>
      </div>

      <input
        className="search"
        placeholder="Kërko qytet"
        value={inputTerm}
        onChange={e => setInputTerm(e.target.value)}
      />

      {activeTab === "qytete" && (
         <div className="cards-container">
          {qyteteFiltruara.map(qytet => (
            <DetajeQyteti   
           key={qytet.id} 
              qytet={qytet}
              weather={hartaMoti[qytet.id]}
              ToggleBookmark={() => toggleBookmark(qytet.id)}
              Bookmark={bookmarks.includes(qytet.id)}
             
             />
          ))}
        </div>
      )}

      {activeTab === "bookmarks" && (
          <div className="cards-container">
        <SeksioniBookmarks
          qyteteBookmark={qyteteBookmark}
          weatherMap={hartaMoti}
          removeFromBookmarks={id =>
            setBookmarks(prev => prev.filter(b => b !== id))
          }
          diteParshikuar={diteParashikuar}
      setDiteParashikuar={setDiteParashikuar}
     />
     </div>
      )}
    </div>
  );
}
