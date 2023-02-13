
import i18next from 'i18next';
import state from "./settings";


    const greeting = document.querySelector('.greeting'),
        name = document.querySelector('.name')


    export function getTimeOfDay() {
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
            default:
                return 'night'
        }
    }


    export const showGreeting = () => {
        const timeOfDay = getTimeOfDay();
        greeting.textContent =  i18next.t(timeOfDay, {lng: state.language})
        name.placeholder = i18next.t('placeholder', {lng: state.language})
    }

    window.addEventListener('DOMContentLoaded', showGreeting)


    function setLocalStorage() {
        localStorage.setItem('name', name.value);
    }

    window.addEventListener('beforeunload', setLocalStorage)

    function getLocalStorage() {
        if (localStorage.getItem('name')) {
            name.value = localStorage.getItem('name');
        }
    }

    window.addEventListener('load', getLocalStorage)




