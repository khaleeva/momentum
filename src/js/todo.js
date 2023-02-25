import i18next from 'i18next';
import state from "./settings";
import {v4 as uuidv4} from 'uuid';


let todoList = {
    list: [],
}


let taskValue = ''

const task = document.querySelector('.task'),
    todo = document.querySelector('.todo-list'),
    todoTitle = document.querySelector('.todo-title')

function setTodoLocalStorage() {
    localStorage.setItem('todo', JSON.stringify(todoList));
}

window.addEventListener("beforeunload", setTodoLocalStorage)


const savedTodoList = JSON.parse(localStorage.getItem('todo'));

if (savedTodoList) {
    todoList.list = savedTodoList.list
}


task.addEventListener('input', function () {
    if (task.value.length > 18) {
        taskValue = task.value.splice(0, 18)
    } else {
        taskValue = task.value
    }

})


document.querySelector('.todo-btn').addEventListener('click', () => {
    const id = uuidv4();
    task.value = ''
    addTask(taskValue, id)
    taskValue = ''
})


function addTask(task, id) {
    if (task) {
        todoList.list.push({'task': task, 'id': id, 'checked': false});
        showTasks()
    }

}

function addRemoveButtonHandlers() {
    document.querySelectorAll('.remove-btn').forEach(remove => remove.addEventListener('click', (e) => {
        removeTask(e.target.previousElementSibling.firstElementChild.id)
    }));
}


function checkTask() {
    document.querySelectorAll('.todo-check').forEach(check =>
        check.addEventListener('change', function (e) {
            const isChecked = check.checked;
            const checkId = check.id
            todoList.list.forEach(l => {
                if (l.id === checkId) {
                    if (isChecked) {
                        e.target.nextElementSibling.style.textDecoration = 'line-through'
                        l.checked = true
                    } else {
                        e.target.nextElementSibling.style.textDecoration = 'none'
                        l.checked = false
                    }
                }
            })
        })
    )

}

function checkTaskFromLS() {
    if (savedTodoList) {
        savedTodoList.list.forEach((item) => {
            if (item.checked) {
                const checkItems = document.querySelector(`input[value="${item.id}"]`);
                if (checkItems) {
                    checkItems.checked = true;
                    checkItems.nextElementSibling.style.textDecoration = 'line-through';
                }
            }
        });
    }
}


export function showTasks() {

    const newTask = document.createElement('div')
    newTask.classList.add('todo-items')
    if (todoList.list.length === 0) {
        todoTitle.innerText = i18next.t('emptyList', {lng: state.language})
        todo.innerHTML = ''
    } else {
        todoTitle.innerText = i18next.t('todolist', {lng: state.language})
        todo.innerHTML =
            todoList.list.map((i, index) => {
                    return `<div class="todo-items">
                        <div class="todo-item">
                            <input type="checkbox" id=${i.id} value=${i.id} class="custom-checkbox todo-check">
                            <label for=${i.id} class="check-task">${index + 1}. ${i.task}</label>
                        </div>
                        <div class="remove-btn"></div>
                  </div>`
                }
            ).join('')
    }

    addRemoveButtonHandlers();
    checkTask()
    checkTaskFromLS()
}


function removeTask(arr, index) {
    todoList.list.splice(index, 1);
    showTasks()
}



