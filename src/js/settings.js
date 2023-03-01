import {getWeather} from "./weather";
import {getQuotes} from "./quotes";
import {getLinkToFlikerImage, getLinkToUnplushImage, getSlideNext, getSlidePrev, setBg} from "./background";
import i18next from 'i18next';
import {showTasks} from "./todo";


const tagInput =  document.querySelector('.tag-input'),
    task = document.querySelector('.task'),
    openSettingsModal = document.querySelector('.settings-btn img'),
    openTodoModal = document.querySelector('.settings-task img')

const blocksElement = ['time', 'date', 'greet', 'quotes', 'weather', 'audio', 'todolist']


let state = {
    language: 'eng',
    photoSource: 'github',
    tag: '',
    blocks: ['time', 'date', 'greet', 'quotes', 'weather', 'audio', 'todolist']
}


export default state



document.addEventListener('DOMContentLoaded', function () {
    toggleBlocks();
    showTasks()

    blocksElement.forEach(block => {
        document.querySelector(`label[for="${block}"]`).textContent = i18next.t(`${block}`, {lng: savedState.language})
    })
    tagInput.placeholder = i18next.t('placeholderTag', {lng: savedState.language})
    task.placeholder = i18next.t('placeholderTodo', {lng: savedState.language})

})

const getVisibiltyIunput = () => {
    tagInput.style.visibility = 'visible'
}

const getHiddenIunput = () => {
    tagInput.style.visibility = 'hidden'
}




function setSettingsLocalStorage() {
    localStorage.setItem('settings', JSON.stringify(state));
}

window.addEventListener("beforeunload", setSettingsLocalStorage)

const savedState = JSON.parse(localStorage.getItem('settings'));

if (savedState) {

    const { language, tag, photoSource, blocks } = savedState;

    state.language = language
    state.photoSource = photoSource
    state.blocks = blocks
    state.tag = tag

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

    const radio = document.querySelector(`input[value= ${language}]`)
    if (radio) {
        radio.checked = true;
    }

    const activeBtn = document.querySelector(`[data-api="${photoSource}"]`);
    if (activeBtn) {
        activeBtn.classList.add('active-back')
    }

    tagInput.value = tag

    if (photoSource === 'flickr') {
        getVisibiltyIunput()
        getLinkToFlikerImage()
    } else if (photoSource === 'unplush') {
        getVisibiltyIunput()
        getLinkToUnplushImage()
    } else {
        getHiddenIunput()
        setBg()
    }

}


openSettingsModal.addEventListener('click', function () {
    document.querySelector('.modal-settings').classList.toggle('open-modal')
})

openTodoModal.addEventListener('click', function () {
    document.querySelector('.settings-todo').classList.toggle('open-modal')
})


document.querySelectorAll('input[type=radio]').forEach(lang => lang.addEventListener('change', () => {
    state.language = lang.value
    blocksElement.forEach(block => {
        document.querySelector(`label[for="${block}"]`).textContent = i18next.t(`${block}`, {lng: state.language})
    })
    tagInput.placeholder = i18next.t('placeholderTag', {lng: state.language})
    task.placeholder = i18next.t('placeholderTodo', {lng: state.language})

    getWeather()
    getQuotes()
    showTasks()
}))


document.querySelectorAll('.back-item').forEach(back => back.addEventListener('click', (e) => {
    state.photoSource = e.target.dataset.api
    if (e.target.dataset.api !== 'github') {
     getVisibiltyIunput()
    } else {
      getHiddenIunput()
    }
    document.querySelectorAll('.back-item').forEach(otherBack => otherBack.classList.remove('active-back'))
    e.target.classList.add('active-back')
    getSlideNext()
    getSlidePrev()
}))

function setTag(e) {

    if (e.code === 'Enter') {
        state.tag = tagInput.value
        if(state.photoSource === 'flickr'){
            getLinkToFlikerImage()
        } else {
            getLinkToUnplushImage()
        }
        tagInput.blur();
    }
}

tagInput.addEventListener('keypress', setTag)


function toggleBlocks() {
    const checkboxes = document.querySelectorAll('.check-block');
    checkboxes.forEach((checkbox) => {
        checkbox.addEventListener('change',  () => {
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













