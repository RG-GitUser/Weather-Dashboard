const apiKey = "0a9bf7e50f304ff78b45ef1a58e054e7";
const weatherResult = document.getElementById('weatherResult');
const locationInput = document.getElementById('locationInput');
const searchButton = document.getElementById('searchBtn');
const searchHistoryContainer = document.getElementById('search-history');


loadSearchHistoryFromLocalStorage();
displaySearchHistory();

searchButton.addEventListener('click', () => {
    const location = locationInput.value;
    if (location) {
        console.log('Location:', location);
        getWeatherAndForecastData(location);
        addToSearchHistory(location);
        saveSearchHistoryToLocalStorage();
        displaySearchHistory();
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
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            weatherResult.innerHTML = 'Error fetching data. Please try again later.';
        });
}

function displayWeatherData(data) {
    const { name, main, weather } = data;
    const temp = (main.temp - 273.15).toFixed(2);
    const description = weather[0].description;

    weatherResult.innerHTML = `<p>Location: ${name}</p>
    <p>Temperature: ${temp}°C</p>
    <p>Description: ${description}</p>`;
}


// Five day forecast
function displayFiveDayForecast(forecastData) {
    const forecastContainer = document.getElementById('forecast-container');
    forecastContainer.innerHTML = ''; 

    const fiveDayForecastData = forecastData.list.slice(0, 5);

    fiveDayForecastData.forEach(item => {
        const timestamp = item.dt_txt;
        const date = new Date(timestamp);
        const temperature = (item.main.temp - 273.15).toFixed(2);
        const description = item.weather[0].description;

        
        const forecastCard = document.createElement('div');
        forecastCard.classList.add('forecast-card');
        forecastCard.innerHTML = `
            <p>Date: ${date.toLocaleDateString()}</p>
            <p>Temperature: ${temperature}°C</p>
            <p>Description: ${description}</p>
        `;

        forecastContainer.appendChild(forecastCard);
    });
}

$(document).ready(function () {
    $('#searchBtn').on('click', function () {
        const searchTerm = $('#searchInput').val();
        if (searchTerm) {
            saveSearchResult(searchTerm);
        }
    })
});

function saveSearchResult(result) {
    const existingResults.push(result);

    localStorage.setItem('searResults', JSON.stringify(existingResults));

    displaySearchResults(existingResults);
}

function displaySearchResults(results => {
    const searchresultsContainer = $(;#searchresults);
    searchresultsContainer.empty();

    results.forEach(result => {
        const resultItem = $('<div>').text(result);
        searchresultsContainer.append(resultItem);
    });
}

const storedResults = JSON.parse(localStorage.getItem('searchResults')) || [];
displaySearchResults(storedResults);

});

















