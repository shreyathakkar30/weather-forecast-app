const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Weather API Running");
});

app.get("/weather/:city", async (req, res) => {

    try {

        const city = req.params.city;

        const url =
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.API_KEY}&units=metric`;

        const response = await axios.get(url);

const data = {

  city: response.data.name,

  temperature: response.data.main.temp,

  description: response.data.weather[0].description,

  humidity: response.data.main.humidity,

  windSpeed: response.data.wind.speed,

  icon: response.data.weather[0].icon

};

        res.json(data);

    } catch (error) {

        console.log(error.message);

        res.status(500).json({
            message: "Error fetching weather"
        });
    }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
