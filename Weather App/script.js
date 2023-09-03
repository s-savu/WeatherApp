const cityInput = document.getElementById('cityInput');
const searchBtn = document.getElementById('searchBtn');
const locationInfo = document.querySelector('.location-info');
const locationName = document.getElementById('locationName');
const weatherInfo = document.querySelector('.weather-info');
const weatherIcon = document.getElementById('weatherIcon');
const temperature = document.getElementById('temperature');
const description = document.getElementById('description');
const humidity = document.getElementById('humidity');
const wind = document.getElementById('wind');
const errorMessage = document.getElementById('errorMessage');
const errorText = document.getElementById('errorText');

const API_KEY = '489fc87da1a9569f2d39c1442cc18444'; 

searchBtn.addEventListener('click', () => {
    const query = cityInput.value;
    fetchWeather(query);
});

cityInput.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
        const query = cityInput.value;
        fetchWeather(query);
    }
});

function fetchWeather(query) {
    
    errorMessage.style.display = 'none';

    
    const coordinates = query.split(',').map(coord => coord.trim());
    if (coordinates.length === 2 && !isNaN(coordinates[0]) && !isNaN(coordinates[1])) {
        const lat = coordinates[0];
        const lon = coordinates[1];
        fetchWeatherByCoordinates(lat, lon);
    } else {
        fetchWeatherByCityName(query);
    }
}

function fetchWeatherByCityName(cityName) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`;

    fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
            if (data.cod === '404') {
                showError('Location not found');
            } else {
                showWeather(data);
            }
        })
        .catch(() => {
            showError('Something went wrong');
        });
}


function showError(message) {
    locationInfo.style.display = 'none';
    weatherInfo.style.display = 'none';
    errorMessage.style.display = 'block';
    errorText.textContent = message;
}

function showWeather(data) {
    locationInfo.style.display = 'block';
    weatherInfo.style.display = 'flex';
    errorMessage.style.display = 'none';

    locationName.textContent = data.name;
    temperature.textContent = `${Math.round(data.main.temp)}°C`;
    description.textContent = data.weather[0].description;
    humidity.textContent = `Humidity: ${data.main.humidity}%`;
    wind.textContent = `Wind: ${data.wind.speed} m/s`;

    
    const iconUrl = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
    weatherIcon.src = iconUrl;
}

