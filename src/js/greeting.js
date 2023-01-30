const greeting = document.querySelector('.greeting'),
    name = document.querySelector('.name')


 export const getTimeOfDay = () => {
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
    greeting.textContent = `Good ${timeOfDay}, `;
}

function setLocalStorage() {
    localStorage.setItem('name', name.value);
}
window.addEventListener('beforeunload', setLocalStorage)

function getLocalStorage() {
    if(localStorage.getItem('name')) {
        name.value = localStorage.getItem('name');
        showGreeting()
    }
}
window.addEventListener('load', getLocalStorage)



