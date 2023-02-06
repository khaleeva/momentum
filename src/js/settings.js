const openSettingsModal = document.querySelector('.settings-btn img'),
    openToDoModal = document.querySelector('.settings-todo img')


    openSettingsModal.addEventListener('click', function () {
    document.querySelector('.modal-settings').classList.toggle('open-modal')
})

openToDoModal.addEventListener('click', function () {
    document.querySelector('.modal-todo').classList.toggle('open-modal')
})
