import {getTimeOfDay} from "./greeting";
import state from './settings'


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


export function getSlideNext() {
    if (randomNum < 20) {
        randomNum += 1
    } else randomNum = 1
    if (state.photoSource === 'flickr') {
        getLinkToFlikerImage().then(r => r)
    } else if (state.photoSource === 'unplush') {
        getLinkToUnplushImage().then(r => r)
    } else {
        setBg()
    }


}

export function getSlidePrev() {
    if (randomNum > 1) {
        randomNum -= 1
    } else randomNum = 20
    if (state.photoSource === 'flickr') {
        getLinkToFlikerImage().then(r => r)
    } else if (state.photoSource === 'unplush') {
        getLinkToUnplushImage().then(r => r)
    } else {
        setBg()
    }
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

async function getLinkToUnplushImage() {
    const url = 'https://api.unsplash.com/photos/random?query=morning&client_id=ru5KfBzJgjIucCmasOEVkxbq7ZKvJ9u-23JRCPvzRtY';
    const res = await fetch(url);
    const data = await res.json();
    const image = new Image();
    image.src = data.urls.regular;
    image.onload = () => {
        body.style.backgroundImage = `url(${data.urls.regular})`;
    };

}


async function getLinkToFlikerImage() {
    const url = 'https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=276918a15aa4e7defd171a6814349a0d&tags=nature&extras=url_l&format=json&nojsoncallback=1';
    const res = await fetch(url);
    const data = await res.json();

    const images = data.photos.photo;
    const imageUrls = images.filter(i => i.url_l).map(i => i.url_l);
    const image = new Image();
    imageUrls.map((img, index) => {
        const imageUrl = imageUrls[index];

        image.src = imageUrl;
        image.onload = () => {
            body.style.backgroundImage = `url(${imageUrl})`;
        };
    })


}







