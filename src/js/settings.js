import {getWeather} from "./weather";
import {getQuotes} from "./quotes";
import {getLinkToFlikerImage, getLinkToUnplushImage, getSlideNext, getSlidePrev} from "./background";

import i18next from 'i18next';
import {showTasks} from "./todo";


document.addEventListener('DOMContentLoaded', function () {
    toggleBlocks();
    showTasks()
    blocks.forEach(block => {
        document.querySelector(`label[for="${block}"]`).textContent = i18next.t(`${block}`, {lng: savedState.language})
    })
    document.querySelector('.tag-input').placeholder = i18next.t('placeholderTag', {lng: savedState.language})
    document.querySelector('.task').placeholder = i18next.t('placeholderTodo', {lng: savedState.language})

})

const blocks = ['time', 'date', 'greet', 'quotes', 'weather', 'audio', 'todolist']


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

const savedState = JSON.parse(localStorage.getItem('settings'));

if (savedState) {
    state.language = savedState.language
    state.photoSource = savedState.photoSource
    state.blocks = savedState.blocks
    state.tag = savedState.tag

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


    const radio = document.querySelector(`input[value= ${savedState.language}]`)
    if (radio) {
        radio.checked = true;
    }

    const activeBtn = document.querySelector(`[data-api="${savedState.photoSource}"]`);

    if (activeBtn) {
        activeBtn.classList.add('active-back')
    }

    document.querySelector('.tag-input').value = `${savedState.tag}`

    if (savedState.photoSource === 'flickr') {
        document.querySelector('.tag-input').style.visibility = 'visible'
        document.querySelector('.tag-btn').style.visibility = 'visible'
        getLinkToFlikerImage(savedState.tag)
    }

    if (savedState.photoSource === 'unplush') {
        document.querySelector('.tag-input').style.visibility = 'visible'
        document.querySelector('.tag-btn').style.visibility = 'visible'
        getLinkToUnplushImage(savedState.tag)
    }

}


const openSettingsModal = document.querySelector('.settings-btn img')



openSettingsModal.addEventListener('click', function () {
    document.querySelector('.modal-settings').classList.toggle('open-modal')
})


document.querySelectorAll('input[type=radio]').forEach(lang => lang.addEventListener('change', () => {
    state.language = lang.value
    blocks.forEach(block => {
        document.querySelector(`label[for="${block}"]`).textContent = i18next.t(`${block}`, {lng: state.language})
    })
    document.querySelector('.tag-input').placeholder = i18next.t('placeholderTag', {lng: state.language})
    document.querySelector('.task').placeholder = i18next.t('placeholderTodo', {lng: state.language})

    getWeather().then(r => r)
    getQuotes().then(r => r)
    showTasks()
}))


document.querySelectorAll('.back-item').forEach(back => back.addEventListener('click', (e) => {
    state.photoSource = e.target.dataset.api
    if (e.target.dataset.api !== 'github') {
        document.querySelector('.tag-input').style.visibility = 'visible'
        document.querySelector('.tag-btn').style.visibility = 'visible'
    } else {
        document.querySelector('.tag-input').style.visibility = 'hidden'
        document.querySelector('.tag-btn').style.visibility = 'hidden'
    }
    document.querySelectorAll('.back-item').forEach(otherBack => otherBack.classList.remove('active-back'))
    e.target.classList.add('active-back')
    getSlideNext()
    getSlidePrev()
}))

document.querySelector('.tag-input').addEventListener('input', () => {
    state.tag = document.querySelector('.tag-input').value

    document.querySelector('.tag-btn').addEventListener('click', () => {
        if(state.photoSource === 'flickr'){
            getLinkToFlikerImage(state.tag)
        } else {
            getLinkToUnplushImage(state.tag)
        }
    })

})

function toggleBlocks() {
    const checkboxes = document.querySelectorAll('.check-block');
    checkboxes.forEach((checkbox) => {
        checkbox.addEventListener('change', function () {
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
    })
}













