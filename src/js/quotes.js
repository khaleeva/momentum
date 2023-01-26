
const quote = document.querySelector('.quote'),
    author = document.querySelector('.author'),
    changeQuotesBtn = document.querySelector('.change-quote')



function getRandomQuotes (data) {
    const min = 0
    const max = data.length
    return Math.floor(Math.random() * (max - min)) + min
}

async function getQuotes() {
    const quotes = 'data.json';
    const res = await fetch(quotes);
    const data = await res.json();
    quote.textContent = data[getRandomQuotes(data)].text
    author.textContent = data[getRandomQuotes(data)].author

}
getQuotes();


changeQuotesBtn.addEventListener('click', getQuotes)


