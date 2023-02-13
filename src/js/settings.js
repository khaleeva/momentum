import {getWeather} from "./weather";
import {getQuotes} from "./quotes";
import {getSlideNext} from "./background";
import {getSlidePrev} from "./background";

import i18next from 'i18next';

const state = {
    language: 'eng',
    photoSource: 'github',
    blocks: ['time', 'date', 'greeting', 'quote', 'weather', 'audio', 'todolist']
}

export default state


const openSettingsModal = document.querySelector('.settings-btn img'),
    openToDoModal = document.querySelector('.settings-todo img'),
    arrowBtns = document.querySelectorAll('.arrow'),
    selectBodies = document.querySelectorAll('.select-body'),
    select_current = document.querySelector('.select-current'),
    choose_lang = document.querySelector('.choose-lang'),
    choose_back = document.querySelector('.choose-back')

window.addEventListener('load', function () {
    choose_lang.textContent = i18next.t('chooseLang', {lng: state.language})
    choose_back.textContent = i18next.t('chooseBack', {lng: state.language})
})
openSettingsModal.addEventListener('click', function () {
    document.querySelector('.modal-settings').classList.toggle('open-modal')
})

openToDoModal.addEventListener('click', function () {
    document.querySelector('.modal-todo').classList.toggle('open-modal')
})

arrowBtns.forEach(arrowBtn =>
    arrowBtn.addEventListener('click', function (e) {
        e.target.parentNode.parentNode.nextSibling.nextSibling.classList.toggle('openSelect')
        if( e.target.parentNode.parentNode.nextSibling.nextSibling.classList.contains('openSelect')){
            arrowBtn.classList.add('arrow-active')
        } else arrowBtn.classList.remove('arrow-active')
    })
)

selectBodies.forEach(selectBody => selectBody.addEventListener('click' , (e) => {
    if (e.target.dataset.option) {
        e.target.parentNode.parentNode.firstElementChild.firstElementChild.innerHTML = `${i18next.t('lang', {lng: e.target.dataset.option})}`
        selectBody.classList.remove('openSelect')
        e.target.parentNode.parentNode.firstElementChild.lastElementChild.firstElementChild.classList.remove('arrow-active')
        state.language = e.target.dataset.option
        choose_lang.textContent = i18next.t('chooseLang', {lng: state.language})
        choose_back.textContent = i18next.t('chooseBack', {lng: state.language})
        getWeather()
        getQuotes()
    }

    if(e.target.dataset.api){
        selectBody.classList.remove('openSelect')
        e.target.parentNode.parentNode.firstElementChild.lastElementChild.firstElementChild.classList.remove('arrow-active')
        state.photoSource = e.target.dataset.api
        e.target.parentNode.parentNode.firstElementChild.firstElementChild.innerHTML  = e.target.textContent
        getSlideNext()
        getSlidePrev()
    }
}
))










