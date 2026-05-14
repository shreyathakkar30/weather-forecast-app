import React, { useState } from "react";
import axios from "axios";

function App() {

  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);

  const getWeather = async () => {

    try {

      const response = await axios.get(
        `http://localhost:5000/weather/${city}`
      );

      setWeather(response.data);

    } catch (error) {
      alert("City not found");
    }
  };

  return (
    <div style={styles.container}>

      <h1>Weather Forecast App</h1>

      <input
        type="text"
        placeholder="Enter city"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        style={styles.input}
      />

      <button onClick={getWeather} style={styles.button}>
        Search
      </button>

      {weather && (
        <div style={styles.card}>
          <h2>{weather.city}</h2>
          <p>Temperature: {weather.temperature} °C</p>
          <p>Weather: {weather.description}</p>
          <p>Humidity: {weather.humidity}%</p>
          <p>Wind Speed: {weather.windSpeed}</p>
        </div>
      )}

    </div>
  );
}

const styles = {

  container: {
    textAlign: "center",
    marginTop: "50px",
    fontFamily: "Arial"
  },

  input: {
    padding: "10px",
    width: "250px"
  },

  button: {
    padding: "10px 20px",
    marginLeft: "10px",
    cursor: "pointer"
  },

  card: {
    border: "1px solid gray",
    width: "300px",
    margin: "20px auto",
    padding: "20px",
    borderRadius: "10px"
  }
};

export default App;