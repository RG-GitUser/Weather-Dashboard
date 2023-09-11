const apiKey = "0a9bf7e50f304ff78b45ef1a58e054e7";
const weatherResult = document.getElementById('weatherResult');
const locationInput = document.getElementById('locationInput');
const searchButton = document.getElementById('searchBtn');


searchButton.addEventListener('click', () => {
    console.log()
    const location = locationInput.value;
    if (location) {
        getWeatherData(location);
    } else {
        alert('Please enter a location.')
    }
});

function getWeatherData(location) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`)
    .then(response => response.json())
    .then(data => {
        displayWeatherData(data);
        console.log();
    })
    .catch(error => {
        console.error('Error fetching weather data:', error);
        weatherResult.innerHTML = 'Error fetching weather data. Please try again later.';
        console.log();
    });

}

function displayWeatherData(data) {
    const {name, main, weather} = data;
    const temp = main.temp - 273.15; 
    const description = weather[0].description;

    weatherResult.innerHTML = `<p>Location: ${name}</p>
    <p>Temperature: ${temp.toFixed(2)}°C</p>
    <p>Description: ${description}</p>`;
    console.log();
}

function getForecastData(location) {
    fetch(`api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}`)
    .then(response => response.json())
    .then(data => {
        displayForecastData(data);
    })
    .catch(error => {
        console.error('error fetching forecast data:', error);
        weatherResult.innerHTML = 'Error fetching forcast data. Please try again later.';

    });

}

function displayForecastData(data) {
    const forecastList = data.list;


    forecastList.forEach(item => {
        const timestamp = item.dt_txt;
        const date = new Date(timestamp);
        const temperature = item.main.temp - 273.15; 

        const forecastInfo = `<p>Date: ${date.toLocaleDateString()}</p>
                              <p>Temperature: ${temperature.toFixed(2)}°C</p>`;

        weatherResult.insertAdjacentHTML('beforeend', forecastInfo);
    });
}

searchButton.addEventListener('click', () => {
    const location = locationInput.value;
    if (location) {
        getWeatherData(location); // Fetch current weather
        getForecastData(location); // Fetch 5-day forecast
    } else {
        alert('Please enter a location.');
    }
});
