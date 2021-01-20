let appId = '5abe7ebe0912db807992a0238bd7ab4a';
let units = 'metric';
let searchMethod; 
let weatherDescriptionHeader = document.getElementById('weatherDescriptionHeader');
let temperatureElement = document.getElementById('temperature');
let humidityElement = document.getElementById('humidity');
let windSpeedElement = document.getElementById('windSpeed');
let cityHeader = document.getElementById('cityHeader');
let weatherIcon = document.getElementById('documentIconImg');


function getSearchMethod(searchTerm) {
    if(searchTerm.length === 5 && Number.parseInt(searchTerm) + '' === searchTerm)
        searchMethod = 'zip';
    else 
        searchMethod = 'q';
}

function searchWeather(searchTerm) {
    getSearchMethod(searchTerm);
    fetch(`http://api.openweathermap.org/data/2.5/weather?${searchMethod}=${searchTerm}&lang=pl&APPID=${appId}&units=${units}`)
        .then((result) => {return result.json();})
        .then((result) => {initialize(result);
    });
}

function initialize(resultFromServer) {
    switch (resultFromServer.weather[0].main) {
        case 'Clear':
            document.body.style.backgroundImage = "url('background/clouds.jpg')";
            break;
        
        case 'Clouds':
            document.body.style.backgroundImage = "url('background/clouds.jpg')";
            break;

        case 'Mist':
            document.body.style.backgroundImage = "url('rain.jpg')";
            break;

        case 'Thunderstorm':
            document.body.style.backgroundImage = "url('background/rain.jpg')";
            break;
        
        case 'Snow':
            document.body.style.backgroundImage = "url('https://i1.wp.com/codemyui.com/wp-content/uploads/2016/11/pure-css-snow-animation.gif')";
            break;

        default:
            break;
    }



    weatherIcon.src = 'http://openweathermap.org/img/w/' + resultFromServer.weather[0].icon + '.png';

    let resultDescription = resultFromServer.weather[0].description; 
     weatherDescriptionHeader.innerText = resultDescription.charAt(0).toUpperCase() + resultDescription.slice(1);
     temperatureElement.innerHTML = Math.floor(resultFromServer.main.temp) + '&#176;';
     windSpeedElement.innerHTML = 'Wiatr wieje z prędkością: ' + Math.floor(resultFromServer.wind.speed) + ' m/s';
     cityHeader.innerHTML = resultFromServer.name;
     humidityElement.innerHTML = 'Wilgotność powietrza na poziomie: ' + resultFromServer.main.humidity +  '%';

    setWeatherContainerPosition();
}

function setWeatherContainerPosition() {

    let weatherContainer = document.getElementById('weatherContainer');

    let weatherContainerHeight = weatherContainer.clientHeight;
    let weatherContainerWidth = weatherContainer.clientWidth;

    weatherContainer.style.left = `calc(50% - ${weatherContainerWidth/2}px)`;
    weatherContainer.style.top = `calc(50% - ${weatherContainerHeight/1.3}px)`;
    weatherContainer.style.visibility = 'visible';
    weatherContainer.style.backgroundColor = '#1d1160';
    weatherContainer.style.boxShadow = '2px 0px 10px black';
   
}

document.getElementById('searchBtn').addEventListener('click', () => {
    let searchTerm = document.getElementById('searchInput').value;
    if(searchTerm)
        searchWeather(searchTerm);
});
