const apiKey = "0a9bf7e50f304ff78b45ef1a58e054e7";
const weatherResult = document.getElementById('weatherResult');
const locationInput = document.getElementById('locationInput');
const searchButton = document.getElementById('searchBtn');
const buttons = document.querySelectorAll('.btnList button');
const searchHistoryContainer = document.getElementById('search-history');
const forecastContainer = document.getElementById('forecast-container');

// Event listener for the search button
searchButton.addEventListener('click', () => {
    const location = locationInput.value;
    if (location) {
        console.log('Location:', location);
        getWeatherAndForecastData(location);
    } else {
        alert('Please enter a location.');
    }
});

function getWeatherAndForecastData(location) {
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${apiKey}`;

    Promise.all([fetch(weatherUrl), fetch(forecastUrl)])
        .then(([weatherResponse, forecastResponse]) => {
            if (!weatherResponse.ok || !forecastResponse.ok) {
                throw new Error('Weather or forecast data not found.');
            }
            return Promise.all([weatherResponse.json(), forecastResponse.json()]);
        })
        .then(([weatherData, forecastData]) => {
            displayWeatherData(weatherData);
            displayFiveDayForecast(forecastData);
            addToSearchHistory(location);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            weatherResult.innerHTML = 'Error fetching data. Please try again later.';
        });
}

function displayWeatherData(data) {
    const { name, main, weather, wind, dt } = data;
    const temp = (main.temp - 273.15).toFixed(2);
    const humidity = main.humidity;
    const windSpeed = wind.speed;
    const iconCode = weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/w/${iconCode}.png`;
    const date = new Date(dt * 1000).toLocaleDateString();
    const description = weather[0].description;

    weatherResult.innerHTML = `
        <h2>Current Weather in ${name}</h2>
        <p>Date: ${date}</p>
        <img src="${iconUrl}" alt="${description}">
        <p>Temperature: ${temp}°C</p>
        <p>Humidity: ${humidity}%</p>
        <p>Wind Speed: ${windSpeed} m/s</p>
        <p>Description: ${description}</p>
    `;
}

function displayFiveDayForecast(forecastData) {
    console.log('forecastData', forecastData);
    forecastContainer.innerHTML = '';

    forecastData.list.slice(0, 5).forEach(item => {
        const { dt, main, weather, wind } = item;
        const temp = (main.temp - 273.15).toFixed(2);
        const humidity = main.humidity;
        const windSpeed = wind.speed;
        const iconCode = weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/w/${iconCode}.png`;
        const date = new Date(dt * 1000).toLocaleDateString();
        const description = weather[0].description;

        const forecastCard = document.createElement('div');
        forecastCard.classList.add('forecast-card');
        forecastCard.innerHTML = `
            <h3>${date}</h3>
            <img src="${iconUrl}" alt="${description}">
            <p>Temperature: ${temp}°C</p>
            <p>Humidity: ${humidity}%</p>
            <p>Wind Speed: ${windSpeed} m/s</p>
            <p>Description: ${description}</p>
        `;

        forecastContainer.appendChild(forecastCard);
    });
}

// Local storage functions
function addToSearchHistory(city) {
    const searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];

    // Check search history 
    if (!searchHistory.includes(city)) {
        searchHistory.push(city);
        localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
        displaySearchHistory();
    }
}

//search history items 

function displaySearchHistory() {
    const searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];

    searchHistoryContainer.innerHTML = '';

    searchHistory.forEach(city => {
        const cityDiv = document.createElement('div');
        cityDiv.classList.add('search-history-item');
        cityDiv.textContent = city;
        searchHistoryContainer.appendChild(cityDiv);

        cityDiv.addEventListener('click', () => {
            locationInput.value = city;
            getWeatherAndForecastData(city);
        });
    });
}




// Initial display of search history
displaySearchHistory();


//clear history 

window.addEventListener('load', () => {
    clearSearchHistory();
});



// btnList event listeners 
buttons.forEach(button => {
    button.addEventListener('click', () => {
        const cityName = button.textContent;
        getWeatherData(cityName);
    });
});



function getWeatherData(cityName) {
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;

    fetch(weatherUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Weather data not found.');
            }
            return response.json();
        })
        .then(data => {
            displayWeatherData(data);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            weatherResult.innerHTML = 'Error fetching data. Please try again later.';
        });
}









