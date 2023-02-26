import i18next from 'i18next';
import state from "./settings";




const weatherIcon = document.querySelector('.weather-icon'),
    temperature = document.querySelector('.temperature'),
    weatherDescription = document.querySelector('.weather-description'),
    wind = document.querySelector('.wind'),
    humidity = document.querySelector('.humidity'),
    city = document.querySelector('.city'),
    weatherError = document.querySelector('.weather-error')



window.addEventListener('DOMContentLoaded', getWeather);


function setCity(event) {
    if (event.code === 'Enter') {
        getWeather();
        city.blur();
        setLocalStorage()
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



export async function getWeather() {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=${state.language}&appid=71932f23a78cf168dfd6519583d125f0&units=metric`;
    const res = await fetch(url);
    const data = await res.json();
    if (res.ok) {
        weatherError.textContent = ''
        document.querySelector('.description-container').style.display = 'flex'
        weatherIcon.classList.add(`owf-${data.weather[0].id}`);
        temperature.textContent = getFormatData(data.main.temp);
        weatherDescription.textContent = data.weather[0].description;
        wind.textContent = `${data.wind.speed} ${i18next.t('speed', {lng: state.language})}`
        humidity.textContent = `${data.main.humidity}%`
        city.placeholder = i18next.t('placeholderCity', {lng: state.language})

    } else {
        weatherError.textContent = data.message
        document.querySelector('.description-container').style.display = 'none'
        temperature.textContent = ``
    }
}




function getFormatData(num) {
    let temp = Math.ceil(num)
    if (temp === 0) {
        return `${temp}°C`
    } else if (temp > 0) {
        return `+${Math.ceil(temp)}°C`
    } else return `${Math.ceil(temp)}°C`

}






