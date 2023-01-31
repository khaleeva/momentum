const greeting = document.querySelector('.greeting'),
    name = document.querySelector('.name')

const i18n = require('i18next');

i18n.init({
    fallbackLng: 'en',
    resources: {
        en: {
            translation: {
                "morning": "Good morning,",
                "afternoon": "Good afternoon,",
                "evening": "Good evening,",
                "night": "Good night,"
            }
        },
        ru: {
            translation: {
                "morning": "Доброе утро,",
                "afternoon": "Добрый день,",
                "evening": "Добрый вечер,",
                "night": "Доброй ночи,"
            }
        }
    }
});


export function getTimeOfDay ()  {
    const date = new Date();
    const hours = date.getHours();
    switch (true) {
        case (hours >= 6 && hours < 12) : {
            return 'morning'
        }
        case (hours >= 12 && hours < 18) : {
            return 'afternoon'
        }
        case (hours >= 18 && hours < 24) : {
            return 'evening'
        }
        default: return 'night'
    }
}





export const showGreeting = () => {
    const timeOfDay = getTimeOfDay();
    greeting.textContent =  i18n.t(timeOfDay, {lng:'ru'})
}

window.addEventListener('DOMContentLoaded', showGreeting)


function setLocalStorage() {
    localStorage.setItem('name', name.value);
}
window.addEventListener('beforeunload', setLocalStorage)

function getLocalStorage() {
    if(localStorage.getItem('name')) {
        name.value = localStorage.getItem('name');
    }
}
window.addEventListener('load', getLocalStorage)




