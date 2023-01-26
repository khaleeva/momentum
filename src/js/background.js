import {getTimeOfDay} from "./greeting";




const body = document.querySelector('body')
const slideNext = document.querySelector('.slide-next')
const slidePrev = document.querySelector('.slide-prev')
let randomNum = 0;


function getRandomNum() {
    const min = 1
    const max = 20
    randomNum = Math.floor(Math.random() * (max - min)) + min

}

getRandomNum()


function getSlideNext() {
    if (randomNum < 20) {
        randomNum += 1
    } else randomNum = 1
    setBg()
}

function getSlidePrev() {
    if (randomNum > 1) {
        randomNum -= 1
    } else randomNum = 20
    setBg()
}

slideNext.addEventListener('click', getSlideNext)
slidePrev.addEventListener('click', getSlidePrev)

const setBg = () => {

    const timeOfDay = getTimeOfDay()
    const bgNum = randomNum.toString().padStart(2, '0')
    const img = new Image();
    img.src = `https://raw.githubusercontent.com/khaleeva/stage1-tasks/webp/images/${timeOfDay}/${bgNum}.webp`
    img.addEventListener('load', () => {
        body.style.backgroundImage = `url(${img.src})`
    })
}
setBg()

