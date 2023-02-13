import {showGreeting} from "./greeting";
import state from "./settings";


    const time = document.querySelector('.time'),
        dateElem = document.querySelector('.date')

    const weekDays = [
        {
            'eng': "Sunday",
            'ru': 'Воскресенье'
        },
        {
            'eng': "Monday",
            'ru': 'Понедельник'

        },
        {
            'eng': "Tuesday",
            'ru': 'Вторник'
        },
        {
            'eng': "Wednesday",
            'ru': 'Среда'
        },
        {
            'eng': "Thursday",
            'ru': 'Четверг'
        },
        {
            'eng': "Friday",
            'ru': 'Пятница'
        },
        {
            'eng': "Saturday",
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
        const currentDate = date.toLocaleDateString(state.language, options);
        const day = date.getDay()
        dateElem.textContent = `${weekDays[day][`${state.language}`]}, ${currentDate}`
    }

    showTime()








