import playList from "./playlist";

const play = document.querySelector('.play'),
    range = document.querySelector('.range'),
    next = document.querySelector('.play-next'),
    prev = document.querySelector('.play-prev'),
    poster = document.querySelector('.player-poster'),
    volume = document.querySelector('.volume'),
    // playListItems = document.querySelector('.play-list'),
    volumeRange = document.querySelector('.volume-range')


let isPlay = true;
const audio = new Audio();
let playNum = 0;
let savedTime = 0;
let savedVolume = volumeRange.value;


poster.style.backgroundImage = `url(${playList[playNum].img})`
document.querySelector('.player-title').textContent = playList[playNum].title
document.querySelector('.player-author').textContent = playList[playNum].author
document.querySelector('.fill-volume').style.width = volumeRange.value * 100 + '%'

// const items = playList.map(playItem => {
//     return `<li class = 'play-item' data-name = ${playItem.key}>${playItem.title}</li>`
// })
// playListItems.innerHTML = items.join('')


const playAudio = () => {
    if (isPlay) {
        audio.src = playList[playNum].src;
        audio.currentTime = savedTime;
        audio.play();
        play.classList.add('pause')
        isPlay = false
        poster.style.backgroundImage = `url(${playList[playNum].img})`
        document.querySelector('.player-title').textContent = playList[playNum].title
        document.querySelector('.player-author').textContent = playList[playNum].author
    } else {
        savedTime = audio.currentTime;
        audio.pause();
        play.classList.remove('pause')
        isPlay = true
    }
}


const playNext = () => {
    if (playNum < playList.length - 1) {
        playNum++
    } else playNum = 0
    savedTime = 0;
    isPlay = true
    playAudio()
}
const playPrev = () => {
    if (playNum > 0) {
        playNum--
    } else playNum = playList.length - 1
    savedTime = 0;
    isPlay = true
    playAudio()

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
    document.querySelector('.fill-volume').style.width = volumeRange.value * 100 + '%'

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

