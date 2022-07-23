let addMessage = document.querySelector('.message'),
  addButton = document.querySelector('.add_button'),
  todo = document.querySelector('.todo');

// Пишем обработчик событий с помощью функции. Нам нужно нажимать на кнопку
// и получать что-то.

// Также создадим массив для хранения каждого сообщения 
let todoList = [];

if(localStorage.getItem('todo')){
  todoList = JSON.parse(localStorage.getItem('todo'));
  displayMessages();
}

// Отслеживаем клик на кнопку и запyскаем функцию
addButton.addEventListener('click', function(){

  let newTodo = {
    todo: addMessage.value,
    checked: false,
    important: false
  };

  todoList.push(newTodo);
// вызываем displayMessages каждый раз при нажатии кнопки Добавить
  displayMessages();

  // Нужно сохранять данные -> localStorage -> передавать объект todoList
  // localStorage принимает только строку => будем наш массив приобразовывать в json строку
  localStorage.setItem('todo', JSON.stringify(todoList));

  // нужно написать скрипт, который будет подтягивать данные из Local Storage
  // это нужно, чтобы после обновления страницы, данные не пропадали
  // ведь по факту они всё ещё есть в Local Storage (Application)
  // этот скрипт будет в начале после let todoList = [];
});


function displayMessages() {

  let displayMessage = '';

  if(todoList.length === 0) todo.innerHTML = '';

  todoList.forEach(function(item, i) {
    displayMessage += `
    <li>
      <input type='checkbox' id='item_${i}' ${item.checked ? 'checked' : ''}>
      <label for='item_${i}' class= "${item.important ? 'important' : ''}">${item.todo}</label>
    </li>
    `;
    todo.innerHTML = displayMessage;
});
}


todo.addEventListener('change', function(event){
  let idInput = event.target.getAttribute('id');
  // let forLabel = todo.querySelector('[for='+ idInput +']');
  let valueLabel = todo.querySelector('[for='+ idInput +']').innerHTML;

  todoList.forEach(function(item){
    if (item.todo === valueLabel){
      item.checked = !item.checked;
      localStorage.setItem('todo', JSON.stringify(todoList));
    }
  });

});


todo.addEventListener('contextmenu', function(event){

  event.preventDefault();

  todoList.forEach(function(item, i){

    if(item.todo === event.target.innerHTML){

      if(event.ctrlKey){
        todoList.splice(i, 1);
      } else {
        item.important = !item.important;
      }

      displayMessages();
      localStorage.setItem('todo', JSON.stringify(todoList));
    }
  });

});

