const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors'); // Import the CORS middleware

const port = 3000; // Change this port if needed

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/weather_app', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Connected to MongoDB");
}).catch((err) => {
    console.error("Failed to connect to MongoDB", err);
});

// Define a schema for weather data
const weatherSchema = new mongoose.Schema({
    city: String,
    temperature: Number,
    description: String,
    humidity: Number,
    windSpeed: Number
});

const Weather = mongoose.model('Weather', weatherSchema);

// Middleware for parsing JSON bodies
app.use(express.json());
app.use(cors());
app.use(express.static('public'));


// Route for saving weather data
app.post('/api/weather', async (req, res) => {
    try {
        const weatherData = req.body;
        const weather = new Weather(weatherData);
        await weather.save();
        res.status(201).send("Weather data saved successfully");
    } catch (err) {
        console.error(err);
        res.status(500).send("Error saving weather data");
    }
});

// Serve the index.html file
app.get("/", (req, res) => {
    res.sendFile("index.html", { root: __dirname });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
