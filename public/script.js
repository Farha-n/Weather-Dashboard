const inputBox = document.querySelector('.input-box');
const searchBtn = document.getElementById('searchBtn');
const weather_img = document.querySelector('.weather-img');
const temperature = document.querySelector('.temperature');
const description = document.querySelector('.description');
const humidity = document.getElementById('humidity');
const wind_speed = document.getElementById('wind-speed');
const location_not_found = document.querySelector('.location-not-found');
const weather_body = document.querySelector('.weather-body');

async function checkWeather(city) {
    const api_key = "44dc726bdd15e5818227f542b5200927"; // Updated API key
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;

    try {
        const response = await fetch(url);
        const weather_data = await response.json();

        if (weather_data.cod === "404") {
            location_not_found.style.display = "flex";
            weather_body.style.display = "none";
            console.log("Location not found");
            return; // Exit the function if location not found
        }

        console.log("Weather data:", weather_data);

        location_not_found.style.display = "none";
        weather_body.style.display = "flex";

        temperature.innerHTML = `${Math.round(weather_data.main.temp - 273.15)}°C`;
        description.innerHTML = `${weather_data.weather[0].description}`;
        humidity.innerHTML = `${weather_data.main.humidity}%`;
        wind_speed.innerHTML = `${weather_data.wind.speed} Km/H`;

        // switch (weather_data.weather[0].main) {
        //     case 'Scattered Clouds':
        //         weather_img.src = "C:\Users\farha\OneDrive\Desktop\Weather app\assets\cloud.png";
        //         break;
        //     case 'Clear':
        //         weather_img.src = "assets/clear.png";
        //         break;
        //     case 'Rain':
        //         weather_img.src = "assets/rain.png";
        //         break;
        //     case 'Smoke':
        //         weather_img.src = "assets/mist.png"; // Corrected path
        //         break;
        //     case 'Snow':
        //         weather_img.src = 'assets/snow.png';
        //         break;
        //     default:
        //         weather_img.src = './assets/default.png'; // Add a default image
        // }

        // Save weather data to backend
        const weatherData = {
            city: city,
            temperature: Math.round(weather_data.main.temp - 273.15),
            description: weather_data.weather[0].description,
            humidity: weather_data.main.humidity,
            windSpeed: weather_data.wind.speed
        };

        const saveResponse = await fetch('http://localhost:3000/api/weather', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(weatherData)
        });

        if (!saveResponse.ok) {
            throw new Error('Failed to save weather data');
        }

        console.log('Weather data saved successfully');
    } catch (error) {
        console.error(error.message);
    }
}

searchBtn.addEventListener('click', () => {
    checkWeather(inputBox.value);
});
