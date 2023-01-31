import {showGreeting} from "./greeting";


const time = document.querySelector('.time'),
    dateElem = document.querySelector('.date')

const weekDays = [
    {
        'en': "Sunday",
        'ru': 'Воскресенье'
    },
    {
        'en': "Monday",
        'ru': 'Понедельник'

    },
    {
        'en': "Tuesday",
        'ru': 'Вторник'
    },
    {
        'en': "Wednesday",
        'ru': 'Среда'
    },
    {
        'en': "Thursday",
        'ru': 'Четверг'
    },
    {
        'en': "Friday",
        'ru': 'Пятница'
    },
    {
        'en': "Saturday",
        'ru': 'Суббота'
    }
];

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
    dateElem.textContent = `${weekDays[day].en}, ${currentDate}`
}

showTime()


