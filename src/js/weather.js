const weatherIcon = document.querySelector('.weather-icon'),
    temperature = document.querySelector('.temperature'),
    weatherDescription = document.querySelector('.weather-description'),
    wind = document.querySelector('.wind'),
    humidity = document.querySelector('.humidity'),
    city = document.querySelector('.city'),
    weatherError = document.querySelector('.weather-error')

document.addEventListener('DOMContentLoaded', getWeather);

function setCity(event) {
    if (event.code === 'Enter') {
        getWeather();
        city.blur();
    }
}

city.addEventListener('keypress', setCity);

function setLocalStorage() {
    localStorage.setItem('city', city.value);
}

function getLocalStorage() {
    if (localStorage.getItem('city')) {
        city.value = localStorage.getItem('city');
        getWeather()
    }
}

window.addEventListener('beforeunload', setLocalStorage)
window.addEventListener('load', getLocalStorage)


async function getWeather() {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=en&appid=71932f23a78cf168dfd6519583d125f0&units=metric`;
    const res = await fetch(url);
    const data = await res.json();
    if (res.ok) {
        weatherError.textContent = ''
        document.querySelector('.description-container').style.display = 'flex'
        weatherIcon.style.visibility = 'visible'
        weatherIcon.classList.add(`owf-${data.weather[0].id}`);
        temperature.textContent = getFormatTemperature(data.main.temp);
        weatherDescription.textContent = data.weather[0].description;
        wind.textContent = `${data.wind.speed} m/s`
        humidity.textContent = `${data.main.humidity}%`

    } else {
        weatherError.textContent = data.message
        document.querySelector('.description-container').style.display = 'none'
        temperature.textContent = ``
    }
}


function getFormatTemperature(num) {

    let temp = Math.ceil(num)

    if (temp === 0) {
        return `${temp}°C`
    } else if (temp > 0) {
        return `+${Math.ceil(temp)}°C`
    } else return `-${Math.ceil(temp)}°C`

}






