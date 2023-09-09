const apiKey = "0a9bf7e50f304ff78b45ef1a58e054e7";
const weatherResult = document.getElementById('weatherResult');
const locationInput = document.getElementById('locationInput');
const searchButton = document.getElementById('searchBtn');


searchButton.addEventListener('click', () => {
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
    <p>Temperature: ${temperature.toFixed(2)}°C</p>
    <p>Description: ${description}</p>`;
    console.log();
}