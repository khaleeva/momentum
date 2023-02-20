import {getWeather} from "./weather";
import {getQuotes} from "./quotes";
import {getLinkToFlikerImage, getLinkToUnplushImage, getSlideNext, getSlidePrev} from "./background";


import i18next from 'i18next';

document.addEventListener('DOMContentLoaded', function () {
    getSettingsLocalStorage();
})

let state = {
    language: 'eng',
    photoSource: 'github',
    tag: '',
    blocks: ['time', 'date', 'greet', 'quotes', 'weather', 'audio', 'todolist']
}


export default state


function setSettingsLocalStorage() {
    localStorage.setItem('settings', JSON.stringify(state));
}
window.addEventListener("beforeunload", setSettingsLocalStorage)

function getSettingsLocalStorage() {
    const savedSettings = JSON.parse(localStorage.getItem('settings'));
    console.log(savedSettings);
    if (localStorage.getItem('settings')) {
        state.language = JSON.parse(localStorage.getItem('settings')).language
        state.photoSource = JSON.parse(localStorage.getItem('settings')).photoSource
        state.tag = JSON.parse(localStorage.getItem('settings')).tag
        // state.blocks = JSON.parse(localStorage.getItem('settings')).blocks
    }

}




const openSettingsModal = document.querySelector('.settings-btn img'),
    openToDoModal = document.querySelector('.settings-todo img'),
    arrowBtns = document.querySelectorAll('.arrow'),
    selectBodies = document.querySelectorAll('.select-body'),
    tag_input = document.querySelector('.tag-input'),
    choose_lang = document.querySelector('.choose-lang'),
    choose_back = document.querySelector('.choose-back'),
    choose_block = document.querySelector('.choose-block')


window.addEventListener('load', function () {
    choose_lang.textContent = i18next.t('chooseLang', {lng: state.language})
    choose_back.textContent = i18next.t('chooseBack', {lng: state.language})
    choose_block.textContent = i18next.t('chooseBlock', {lng: state.language})
})
openSettingsModal.addEventListener('click', function () {
    document.querySelector('.modal-settings').classList.toggle('open-modal')
})

openToDoModal.addEventListener('click', function () {
    document.querySelector('.modal-todo').classList.toggle('open-modal')
})

arrowBtns.forEach(arrowBtn => {
    arrowBtn.addEventListener('click', function (e) {
        const currentItem = e.target.parentNode.parentNode.nextSibling.nextSibling;
        const allItems = document.querySelectorAll('.select-body');

        allItems.forEach(item => {
            if (item !== currentItem && item.classList.contains('openSelect')) {
                item.classList.remove('openSelect');
                item.previousSibling.previousSibling.classList.remove('arrow-active');
            }
        });

        currentItem.classList.toggle('openSelect');
        arrowBtn.classList.toggle('arrow-active');
    });
});

selectBodies.forEach(selectBody => selectBody.addEventListener('click', (e) => {
        if (e.target.dataset.option) {
            e.target.parentNode.parentNode.firstElementChild.firstElementChild.innerHTML = `${i18next.t('lang', {lng: e.target.dataset.option})}`
            selectBody.classList.remove('openSelect')
            e.target.parentNode.parentNode.firstElementChild.lastElementChild.firstElementChild.classList.remove('arrow-active')
            state.language = e.target.dataset.option
            choose_lang.textContent = i18next.t('chooseLang', {lng: state.language})
            choose_back.textContent = i18next.t('chooseBack', {lng: state.language})
            choose_block.textContent = i18next.t('chooseBlock', {lng: state.language})
            getWeather()
            getQuotes()
        }

        if (e.target.dataset.api) {
            selectBody.classList.remove('openSelect')
            e.target.parentNode.parentNode.firstElementChild.lastElementChild.firstElementChild.classList.remove('arrow-active')
            state.photoSource = e.target.dataset.api
            e.target.parentNode.parentNode.firstElementChild.firstElementChild.innerHTML = e.target.textContent
            getSlideNext()
            getSlidePrev()

            if (e.target.dataset.api !== 'github') {
                tag_input.style.visibility = 'visible'
                tag_input.addEventListener('blur', () => {
                    state.tag = tag_input.value
                    if (e.target.dataset.api === 'flickr') {
                        getLinkToFlikerImage(state.tag)
                    } else {
                        getLinkToUnplushImage(state.tag)
                    }
                })
            } else {
                tag_input.style.visibility = 'hidden'
                tag_input.value = ''
            }
        }
    }
))

function toggleBlocks() {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach((checkbox) => {
        checkbox.addEventListener('change', function() {
            const isChecked = checkbox.checked;
            const blockName = checkbox.value;
            const blockElement = document.querySelector(`.${blockName}`);
            if (isChecked) {
                blockElement.classList.add('addBlock');
                state.blocks.push(blockName);
            } else {
                blockElement.classList.remove('addBlock');
                const index = state.blocks.indexOf(blockName);
                if (index !== -1) {
                    state.blocks.splice(index, 1);
                }
            }
        });
    });


    const savedState = JSON.parse(localStorage.getItem('settings'));
    if (savedState) {
        savedState.blocks.forEach((blockName) => {
            const blockElement = document.querySelector(`.${blockName}`);
            if (blockElement) {
                blockElement.classList.add('addBlock');
                const checkbox = document.querySelector(`input[value= ${blockName}]`);
                if (checkbox) {
                    checkbox.checked = true;
                }
            }
        });
        state.blocks = savedState.blocks;
    }
}

toggleBlocks()








