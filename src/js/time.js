import {showGreeting} from "./greeting";

const time = document.querySelector('.time'),
    dateElem = document.querySelector('.date')

const weekDays = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

const showTime = () => {
    const date = new Date();
    time.textContent = date.toLocaleTimeString()
    showDate()
    showGreeting()
    setTimeout(showTime, 1000)
}

const showDate = () => {
    const date = new Date();
    const options = {month: 'long', day: 'numeric'};
    const currentDate = date.toLocaleDateString('en-En', options);
    const day = date.getDay()
    dateElem.textContent = `${weekDays[day]}, ${currentDate}`
}

showTime()


