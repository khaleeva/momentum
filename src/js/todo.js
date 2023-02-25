import i18next from 'i18next';
import state from "./settings";
import { v4 as uuidv4 } from 'uuid';



let todoList = {
    list: [],
    checked: []
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
        todoList.checked = savedTodoList.checked





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
        todoList.list.push({'task': task, 'id': id});
        showTasks()
    }

}

function addRemoveButtonHandlers() {
    document.querySelectorAll('.remove-btn').forEach(remove => remove.addEventListener('click', (e) => {
        removeTask(todoList.list, e.target.previousElementSibling.firstElementChild.id)
        removeTask(todoList.checked, e.target.previousElementSibling.firstElementChild.id)

    }));
}


function checkTask() {
        document.querySelectorAll('.todo-check').forEach(check =>
            check.addEventListener('change', function (e) {
                const isChecked = check.checked;
                const checkElem = check.value

                if (isChecked) {
                    e.target.nextElementSibling.style.textDecoration = 'line-through'
                    todoList.checked.push(checkElem)

                } else {
                    e.target.nextElementSibling.style.textDecoration = 'none'
                    const index = todoList.checked.indexOf(checkElem);
                    if (index !== -1) {
                        removeTask(todoList.checked, index)
                    }
                }
            })
        )

}

function checkTaskFromLS() {
    if (savedTodoList) {
        savedTodoList.checked.forEach((id) => {
            setTimeout(() => {
                const checkItems = document.querySelector(`input[value="${id}"]`);
                console.log(checkItems)
                if (checkItems) {
                    checkItems.checked = true;
                    checkItems.nextElementSibling.style.textDecoration = 'line-through';
                }
            }, 100); // задержка в 100 мс
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
            todoList.list.map((i, index) =>{
                return `<div class="todo-items">
                        <div class="todo-item">
                            <input type="checkbox" id=${i.id} value=${i.id} class="custom-checkbox todo-check">
                            <label for=${i.id} class="check-task">${index + 1}. ${i.task}</label>
                        </div>
                        <div class="remove-btn"></div>
                  </div>`}
            ).join('')
    }

    addRemoveButtonHandlers();
    checkTask()
    checkTaskFromLS()
}




function removeTask(arr, index) {
    console.log(index)
    arr.splice(index, 1);
    showTasks()
}



