'use strict';

const btn = document.querySelector('.add-btn');
const inputText = document.getElementById('myText');
const section = document.querySelector('section');

let todos = [];

window.onload = () => {
  if (localStorage.todo) {
    todos = JSON.parse(localStorage.todo);
    renderTodoList();
  }
};

const addToList = function () {
  const textVal = inputText.value;

  if (textVal === '') {
    alert('Enter a Value');
  } else {
    let currentTodo = {
      id: new Date().getTime(),
      todoText: textVal,
      isCompleted: false,
    };

    todos.push(currentTodo);
    console.log(todos);

    renderTodoList();
    inputText.value = '';
  }
};

btn.addEventListener('click', addToList);

document.addEventListener('keydown', function (e) {
  if (e.key == 'Enter') {
    addToList();
  }
});

function renderTodoList() {
  localStorage.setItem('todo', JSON.stringify(todos));
  section.innerHTML = '';

  todos.forEach(todo => {
    section.innerHTML += `
      <div class="container">
        <div class="element ${todo.isCompleted ? 'strike' : ''}">${
      todo.todoText
    }</div>
        <button class="btn-edit" data-id="${
          todo.id
        }" onclick="editTodo(event)">Edit</button>
        <button class="btn-toggle" data-id="${
          todo.id
        }" onclick="setCompleted(event)">Toggle</button>
        <button class="btn-delete" data-id="${
          todo.id
        }" onclick="deleteTodo(event)">Delete</button>
      </div>
    `;
  });
}

function deleteTodo(event) {
  const id = event.target.attributes['data-id'].value;

  for (let index = 0; index < todos.length; index++) {
    if (todos[index].id == id) {
      todos.splice(index, 1);
      renderTodoList();
    }
  }
}

function setCompleted(event) {
  const id = event.target.attributes['data-id'].value;

  let mappedArray = todos.map(todo => {
    if (todo.id == id) {
      return { ...todo, isCompleted: !todo.isCompleted };
    } else {
      return todo;
    }
  });
  todos = mappedArray;
  renderTodoList();
}

function editTodo(event) {
  const id = event.target.attributes['data-id'].value;

  let elem = event.target.previousElementSibling;
  elem.contentEditable = true;
  elem.focus();

  elem.addEventListener('blur', event => {
    let mappedArray = todos.map(todo => {
      if (todo.id == id) {
        return { ...todo, todoText: event.target.textContent };
      } else {
        return todo;
      }
    });

    todos = mappedArray;
    renderTodoList();
    elem.contentEditable = false;
  });
}
