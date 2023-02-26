import {getTimeOfDay} from "./greeting";
import state from './settings'



const body = document.querySelector('body')
const slideNext = document.querySelector('.slide-next')
const slidePrev = document.querySelector('.slide-prev')
let randomNum = 0;
const timeOfDay = getTimeOfDay()
let index = 0

document.addEventListener('DOMContentLoaded', function () {
    const src = JSON.parse(localStorage.getItem('imageSrc'));
    body.style.backgroundImage = `url(${src})`;
    getRandomNum()

})

function getRandomNum() {
    const min = 1
    const max = 20
    randomNum = Math.floor(Math.random() * (max - min)) + min
}



export function getSlideNext() {
    if (state.photoSource === 'flickr') {
        index++;
        getLinkToFlikerImage()
    } else if (state.photoSource === 'unplush') {
        getLinkToUnplushImage()
    } else {
        if (randomNum < 20) {
            randomNum += 1
        } else randomNum = 1
        setBg()
    }

}

export function getSlidePrev() {
    if (state.photoSource === 'flickr') {
        index--;
        getLinkToFlikerImage()
    } else if (state.photoSource === 'unplush') {
        getLinkToUnplushImage()
    } else {
        if (randomNum > 1) {
            randomNum -= 1
        } else randomNum = 20
        setBg()
    }
}



slideNext.addEventListener('click', getSlideNext)
slidePrev.addEventListener('click', getSlidePrev)

export const setBg = () => {
    const bgNum = randomNum.toString().padStart(2, '0')
    const img = new Image();
    img.src = `https://raw.githubusercontent.com/khaleeva/stage1-tasks/webp/images/${timeOfDay}/${bgNum}.webp`
    img.addEventListener('load', () => {
        body.style.backgroundImage = `url(${img.src})`
    })
}




export const getLinkToUnplushImage = async () => {

    try {
        const tag = state.tag || timeOfDay;
        const url = `https://api.unsplash.com/photos/random?query=${tag}&client_id=ru5KfBzJgjIucCmasOEVkxbq7ZKvJ9u-23JRCPvzRtY`;
        const res = await fetch(url);
        if (res.status === 200) {
            const data = await res.json();
            const image = new Image();
            image.src = data.urls['regular'];
            localStorage.setItem('imageSrc', JSON.stringify(image.src));
            image.onload = () => {
                body.style.backgroundImage = `url(${image.src})`;
            };
        } else {
            alert(`Ошибка получения изображения. Статус: ${res.status}`);
        }
    } catch (error) {
        console.log(error.message);
    }
}


export const getLinkToFlikerImage = async () =>{
    const tag = state.tag || timeOfDay;
    const url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=276918a15aa4e7defd171a6814349a0d&tags=${tag}&extras=url_l&format=json&nojsoncallback=1`;
    const res = await fetch(url);
    const data = await res.json();
    const images = data.photos.photo;

    if(images.length) {
        const imageUrls = images.filter(i => i.url_l).map(i => i.url_l);
        const image = new Image();
        image.src = imageUrls[index];
        localStorage.setItem('imageSrc', JSON.stringify(image.src));
        image.onload = () => {
            body.style.backgroundImage = `url(${image.src})`;
        };

    } else alert(`Error message : Flickr API doesn't work, try to get photos later`)



}







