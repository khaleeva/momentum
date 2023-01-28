// import playList from './playlist'
//
// const prev = document.querySelector('.play-prev'),
//     next = document.querySelector('.play-next'),
//     play = document.querySelector('.play'),
//     playListItems = document.querySelector('.play-list')
//
//
// let isPlay = false;
// const audio = new Audio();
// let playNum = 0;
//
//
// const playNext = () => {
//     if (playNum < playList.length - 1) {
//         playNum++
//     } else playNum = 0
//     isPlay = false
//     playAudio()
//     setActiveClass(playNum)
// }
//
// const playPrev = () => {
//
//     if (playNum > 0) {
//         playNum--
//     } else playNum = playList.length - 1
//
//     isPlay = false
//     playAudio()
//     setActiveClass(playNum)
// }
//
//
// prev.addEventListener('click', playPrev)
// next.addEventListener('click', playNext)
//
// const items = playList.map(playItem => {
//     return `<li class = 'play-item' data-name = ${playItem.key}>${playItem.title}</li>`
// })
// playListItems.innerHTML = items.join('')
//
// const elemArr = Array.from(playListItems.childNodes)
//
//
// const setActiveClass = (num) => {
//     if (playListItems) {
//         if (!num) {
//             elemArr.forEach(el => {
//                 if (el.classList.contains('item-active')) {
//                     el.classList.remove('item-active')
//                 }
//             })
//         }
//         elemArr.forEach(el => {
//             if (el.classList.contains('item-active') && el.dataset.name !== playList[num].key) {
//                 el.classList.remove('item-active')
//             } else if (el.dataset.name === playList[num].key) {
//                 el.classList.add('item-active')
//             }
//         })
//     }
// }
//
//
// const playAudio = () => {
//     if (!isPlay) {
//         let currentTrack = 0;
//         audio.onended = function () {
//             currentTrack++;
//             if (currentTrack >= playList.length) {
//                 currentTrack = 0;
//             }
//             audio.src = playList[currentTrack].src;
//             audio.play();
//             setActiveClass(currentTrack)
//         }
//         audio.src = playList[playNum].src;
//         audio.currentTime = 0;
//         audio.play();
//         play.classList.add('pause')
//         isPlay = true
//         setActiveClass(playNum)
//
//     } else {
//         audio.pause();
//         play.classList.remove('pause')
//         isPlay = false
//         setActiveClass(null)
//     }
// }
//
// play.addEventListener('click', playAudio)
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
