import state from "./settings";

const quote = document.querySelector('.quote'),
    author = document.querySelector('.author'),
    changeQuotesBtn = document.querySelector('.change-quote')



function getRandomQuotes (data) {
    const min = 0
    const max = data.length
    return Math.floor(Math.random() * (max - min)) + min
}

export async function getQuotes() {
    const quotes = state.language === 'eng' ? 'data.json' : 'data-ru.json';
    const res = await fetch(quotes);
    const data = await res.json();
    quote.textContent = data[getRandomQuotes(data)].text
    author.textContent = data[getRandomQuotes(data)].author

}

window.addEventListener('load', getQuotes)



changeQuotesBtn.addEventListener('click', getQuotes)


