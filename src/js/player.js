import playList from "./playlist";

const play = document.querySelector('.play'), range = document.querySelector('.range'),
    next = document.querySelector('.play-next'), prev = document.querySelector('.play-prev'),
    poster = document.querySelector('.player-poster'), volume = document.querySelector('.volume'),
    playListItems = document.querySelector('.play-list'), volumeRange = document.querySelector('.volume-range'),
    author = document.querySelector('.sound-author'), title = document.querySelector('.sound-title'),
    fillVolume = document.querySelector('.fill-volume'),
    openPlayListBtn = document.querySelector('.playlist'),
    playListContainer = document.querySelector('.playlist-container')

let isPlay = true;
const audio = new Audio();
let playNum = 0;
let savedTime = 0;
let currentSong = null;
let savedVolume = volumeRange.value;

document.addEventListener("DOMContentLoaded", () => {

    poster.style.backgroundImage = `url(${playList[playNum].img})`
    title.textContent = playList[playNum].title
    author.textContent = playList[playNum].author
    fillVolume.style.width = volumeRange.value * 100 + '%'

});


const items = playList.map(playItem => {
    return `<li class = 'play-item ' data-id = ${playItem.id}>
                <div class="item-title">${playItem.title}</div>
                <div class="item-author">${playItem.author}</div>
            </li>`
})

playListItems.innerHTML = items.join('')


const elemArr = Array.from(playListItems.childNodes)


elemArr.forEach(function(element) {
    element.addEventListener("click", togglePlay.bind([isPlay, savedTime], element));
});

function togglePlay(element) {
    playNum = element.dataset.id - 1
    if (currentSong === null) {
        currentSong = element.dataset.id;
        isPlay = true
    }else if (currentSong === element.dataset.id) {
        savedTime = audio.currentTime
        if(!isPlay){
            isPlay = true
            playAudio()
        }
    } else {
        currentSong = element.dataset.id
        isPlay = true
        savedTime = 0
    }
    playAudio()
}



const setActiveClass = (num) => {
    if (playListItems) {
        if (!num) {
            elemArr.forEach(el => {
                if (el.classList.contains('item-active')) {
                    el.classList.remove('item-active')
                    el.style.setProperty('--image', 'url(../assets/svg/playPl.svg)');
                }
            })
        }
        elemArr.forEach(el => {
            if (el.classList.contains('item-active') && el.dataset.id !== (playList[num].id).toString()) {
                el.classList.remove('item-active')
                el.style.setProperty('--image', 'url(../assets/svg/playPl.svg)');
            } else if (el.dataset.id === (playList[num].id).toString()) {
                el.classList.add('item-active')
                el.style.setProperty('--image', 'url(../assets/svg/pausePl.svg)');
            }
        })
    }
}

const openPlayList = () => {
    playListContainer.classList.toggle('open-playlist')
}

openPlayListBtn.addEventListener('click', openPlayList)


const playAudio = () => {
    if (isPlay) {
        audio.src = playList[playNum].src;
        audio.currentTime = savedTime;
        audio.play();
        play.classList.add('pause')
        isPlay = false
        poster.style.backgroundImage = `url(${playList[playNum].img})`
        if (playList[playNum].author.length > 23) {
            author.classList.add('scroll')
        } else author.classList.remove('scroll')

        if (playList[playNum].title.length > 21) {
            title.classList.add('scroll')
        } else title.classList.remove('scroll')

        title.textContent = playList[playNum].title
        author.textContent = playList[playNum].author
        setActiveClass(playNum)
    } else {
        savedTime = audio.currentTime;
        audio.pause();
        play.classList.remove('pause')
        isPlay = true
        setActiveClass(null)
    }
}


const playNext = () => {
    if (playNum < playList.length - 1) {
        playNum++
    } else playNum = 0
    savedTime = 0;
    isPlay = true
    playAudio()
    setActiveClass(playNum)
}
const playPrev = () => {
    if (playNum > 0) {
        playNum--
    } else playNum = playList.length - 1
    savedTime = 0;
    isPlay = true
    playAudio()
    setActiveClass(playNum)

}

next.addEventListener('click', playNext)
prev.addEventListener('click', playPrev)

audio.addEventListener('ended', function () {
    savedTime = 0;
    playNext();

});

function changeVolume() {
    audio.volume = volumeRange.value
    savedVolume = audio.volume
    fillVolume.style.width = volumeRange.value * 100 + '%'

}

volumeRange.addEventListener('input', changeVolume)

function changeRange() {
    audio.currentTime = range.value;
}

range.addEventListener('input', changeRange)


function updateRangeValue() {
    let x = 100 / audio.duration
    range.value = audio.currentTime
    range.max = Math.floor(audio.duration)
    document.querySelector('.fill').style.width = audio.currentTime * x + '%'
    let currentTime = formatTime(Math.floor(audio.currentTime))
    let durationTime = formatTime(Math.floor(audio.duration))

    document.querySelector('.current-duration').innerHTML = `
        <span>${currentTime}</span> / <span>${durationTime !== "NaN:NaN" ? durationTime : '0:00'}</span>
    `
}

setInterval(updateRangeValue, 500);

function formatTime(seconds) {
    let min = Math.floor((seconds / 60))
    let sec = Math.floor(seconds - (min * 60))
    if (sec < 10) {
        sec = `0${sec}`
    }
    return `${min}:${sec}`
};


function muted() {
    if (audio.volume) {
        audio.volume = 0
        volumeRange.value = 0
        document.querySelector('.fill-volume').style.width = volumeRange.value + '%'
        volume.classList.add('mute')
    } else {
        audio.volume = savedVolume
        volumeRange.value = savedVolume
        document.querySelector('.fill-volume').style.width = volumeRange.value * 100 + '%'
        volume.classList.remove('mute')
    }
}

volume.addEventListener('click', muted)
play.addEventListener('click', playAudio)

