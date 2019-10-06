let addMessage = document.querySelector('.message'),
    addButton = document.querySelector('.add'),
    todo = document.querySelector('.list')

let todoList = [];

if(localStorage.getItem('todo')) {
    todoList = JSON.parse(localStorage.getItem('todo'));
    displayMessage();
};

addButton.addEventListener('click', function(){
    let newTodo = {
        todo: addMessage.value,
        checked: false,
        important: false
    };
    todoList.push(newTodo);
    displayMessage();
    localStorage.setItem('todo', JSON.stringify(todoList));
});

function displayMessage() {
    let displayMessage = '';
    todoList.forEach(function(item, i){
        displayMessage += `
        <li class='list-item'>
            <input id='item_${i}'  type='checkbox' ${item.checked ? 'checked' : ''}>
            <label for='item_${i}' class='${item.important ? 'important' : ''}'>${item.todo}</label>
        </li>
        `;
        todo.innerHTML = displayMessage;
    })
};

todo.addEventListener('change', function(event){
    let idInput = event.target.getAttribute('id');
    let forLable = todo.querySelector(`[for=${idInput}]`);
    let valueLable = forLable.innerHTML;

    todoList.forEach(function(item){
        if(item.todo === valueLable) {
            item.checked = !item.checked;
            item.important = !item.important;
        }
        localStorage.setItem('todo', JSON.stringify(todoList));
    })
    displayMessage();
});

let ololo = true;