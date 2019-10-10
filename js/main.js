"use strict"
// ------------------------- header - date ------------------------------
let date = new Date(),
    day = date.getDay(),
    hours = date.getHours(),
    minutes = date.getMinutes();

document.querySelector('#day').innerHTML = getWeekDay(day);
document.querySelector('#date').innerHTML = date.getDate();
document.querySelector('#month').innerHTML = date.getMonth() + 1;
document.querySelector('#year').innerHTML = date.getFullYear();

function getWeekDay(day) {
    let days = ['Воскресение', 'Понедельник', 'Вторник',
                'Среда', 'Четверг', 'Пятница', 'Субота'];
    return days[day];
}
// ------------------------ header - counter ----------------------------
let counter = document.querySelector('#counter'),
    counterVal = 0;

function todoCounter() {
    counterVal > 1 ? counter.innerHTML = `${counterVal} Tasks` : counter.innerHTML = `${counterVal} Task`;
}
// ----------------------------------------------------------------------
let addMessage = document.querySelector('.message'),
    addButton = document.querySelector('.add'),
    tabsContent = document.querySelector('.tabs-content'),
    todo = document.querySelector('#to-do-list'),
    done = document.querySelector('#done-list');

let todoList = [];

if(localStorage.getItem('todo')) {
    todoList = JSON.parse(localStorage.getItem('todo'));
    displayMessage();
    displayDoneMessage();
    counterVal = Object.keys(todoList).length;
    todoCounter();
};

addButton.addEventListener('click', function(){
    if (addMessage.value !== '') {
        let newTodo = {
            todo: addMessage.value,
            checked: false,
            important: false
        };
        todoList.unshift(newTodo);
        displayMessage();
        localStorage.setItem('todo', JSON.stringify(todoList));
        addMessage.value = '';
        todoCounter(counterVal++);
    }
});

function displayMessage() {
    let displayMessage = '';
    todoList.forEach(function(item, i){
        if(!item.checked) {
            displayMessage += `
            <li class='list-item'>
                <input id='item_${i}'  type='checkbox' ${item.checked ? 'checked' : ''}>
                <label for='item_${i}' class='${item.important ? 'important' : ''}'>${item.todo}</label>
                <i class="delete-item fas fa-trash-alt"></i>
            </li>
            `;
        }
    });
    todo.innerHTML = displayMessage;
};
function displayDoneMessage() {
    let displayDoneMessage = '';
    todoList.forEach(function(item, i){
        if(item.checked) {
            displayDoneMessage += `
            <li class='list-item'>
                <input id='item_${i}'  type='checkbox' ${item.checked ? 'checked' : ''}>
                <label for='item_${i}' class='${item.important ? 'important' : ''}'>${item.todo}</label>
                <i class="delete-item fas fa-trash-alt"></i>
            </li>
            `;
        }
    });
    done.innerHTML = displayDoneMessage;
};

tabsContent.addEventListener('change', function(event){
    let idInput = event.target.getAttribute('id');
    let forLable = tabsContent.querySelector(`[for=${idInput}]`);
    let valueLable = forLable.innerHTML;

    todoList.forEach(function(item){
        if(item.todo === valueLable) {
            item.checked = !item.checked;
            if(item.checked) {
                setTimeout(() => {
                    event.target.parentElement.style.cssText = `transition: 0.5s;
                    transform: translateX(100%);
                    `;
                    setTimeout(() => {
                        event.target.parentElement.remove();
                    }, 500);
                }, 0);
                displayDoneMessage();
            }
            if(!item.checked) {
                setTimeout(() => {
                    event.target.parentElement.style.cssText = `transition: 0.5s;
                    transform: translateX(-100%);
                    `;
                    setTimeout(() => {
                        event.target.parentElement.remove();
                    }, 500);
                }, 0);
                displayMessage();
            }
        }
    });
    localStorage.setItem('todo', JSON.stringify(todoList));
});
// ------------------------- delete todo-item ------------------------------
tabsContent.addEventListener('click', function(event){
    if (event.target.tagName == 'I') {
        let idInput = event.target.parentElement.firstElementChild.getAttribute('id');
        let forLable = tabsContent.querySelector(`[for=${idInput}]`);
        let valueLable = forLable.innerHTML;
    
        todoList.forEach(function(item, i){
            if(item.todo === valueLable) {
                todoList.splice(i,1);
            }
        });
        localStorage.setItem('todo', JSON.stringify(todoList));
        setTimeout(() => {
            event.target.parentElement.style.cssText = `transition: 0.5s;
            background-color: red;
            opacity: 0;
            `;
            setTimeout(() => {
                event.target.parentElement.remove();
            }, 500);
        }, 0);
        todoCounter(counterVal--);
    }
});
// ------------------------------- tabs -----------------------------------
let tab = function () {
    let tabNav = document.querySelectorAll('.tabs-nav-item'),
    tabContent = document.querySelectorAll('.tab');
    let tabName;

    tabNav.forEach(item => {
        item.addEventListener('click', selectTabNav)
    })
    function selectTabNav() {
        tabNav.forEach(item => {
            item.classList.remove('is-active');
        })
        this.classList.add('is-active');
        tabName = this.getAttribute('data-tab-name');
        selectTabContent(tabName);
    }
    function selectTabContent(tabName) {
        tabContent.forEach(item => {
            item.classList.contains(tabName) ? item.classList.add('is-active') : item.classList.remove('is-active');
        })
    }
};
tab();