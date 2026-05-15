import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {

  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [recentSearches, setRecentSearches] = useState([]);
  const [dateTime, setDateTime] = useState(new Date());

  useEffect(() => {
  const timer = setInterval(() => {
    setDateTime(new Date());
  }, 1000);

  return () => clearInterval(timer);
}, []);
const getWeather = async () => {

  if (!city) return;

  try {

    setLoading(true);
    setError("");

    const response = await axios.get(
      `https://weather-forecast-backend-ngrs.onrender.com/weather/${city}`
    );

    setWeather(response.data);

    setRecentSearches((prev) => {

      const updated = [
        city,
        ...prev.filter((item) => item !== city)
      ];

      return updated.slice(0, 5);

    });

  } catch (error) {

    setError("City not found");
    setWeather(null);

  } finally {

    setLoading(false);

  }
};

  return (

    <div
  className={`app ${
    weather?.description?.includes("cloud")
      ? "cloudy"
      : weather?.description?.includes("rain")
      ? "rainy"
      : weather?.description?.includes("clear")
      ? "sunny"
      : "default-bg"
  }`}
>
      <h1 className="title">🌤 Weather Forecast</h1>
      <p className="datetime">
  {dateTime.toLocaleDateString()} |{" "}
  {dateTime.toLocaleTimeString()}
</p>

      <div className="search-box">

        <input
          type="text"
          placeholder="Enter city name..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={(e) => {
  if(e.key === "Enter"){
    getWeather();
  }
}}
        />

        <button onClick={getWeather}>
          Search
        </button>

      </div>
      <div className="recent-searches">

  <h3>Recent Searches</h3>

  <div className="history-list">

    {recentSearches.map((item, index) => (

      <span
        key={index}
        onClick={() => {
          setCity(item);
        }}
      >
        {item}
      </span>

    ))}

  </div>

</div>

      {error && <p className="error">{error}</p>}
      {loading && <div className="loading">Loading weather...</div>}

      {weather && (

        <div className="weather-card">

         <img
  className="weather-icon"
  src={`https://openweathermap.org/img/wn/${weather.icon}@4x.png`}
  alt="weather icon"
/>

          <h2>{weather.city}</h2>

          <div className="temp">
            {weather.temperature}°C
          </div>

          <div className="description">
            {weather.description}
          </div>

          <div className="details">
            <p>💧 Humidity: {weather.humidity}%</p>
            <p>💨 Wind Speed: {weather.windSpeed}</p>
          </div>

        </div>

      )}

      <div className="footer">

  <p>Built by Shreya Thakkar ❤️</p>

  <div className="social-links">

    <a
      href="https://www.instagram.com/shreyaathakkar30"
      target="_blank"
      rel="noreferrer"
    >
      📸 Instagram
    </a>

    <a
      href="https://www.linkedin.com/in/shreya-thakkar30/"
      target="_blank"
      rel="noreferrer"
    >
      💼 LinkedIn
    </a>

    <a
      href="https://github.com/shreyathakkar30"
      target="_blank"
      rel="noreferrer"
    >
      💻 GitHub
    </a>

  </div>

</div>

    </div>
  );
}

export default App;