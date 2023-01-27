'use strict';

const btn = document.querySelector('.add-btn');
const inputText = document.getElementById('myText');
const section = document.querySelector('section');

const addToList = function () {
  {
    // create outerDiv container element
    const divContainer = document.createElement('div');
    // create innerDiv element
    const elem = document.createElement('div');
    // create edit button
    const editBtn = document.createElement('button');
    // create delete button
    const deleteBtn = document.createElement('button');

    const textVal = inputText.value;

    if (textVal === '') {
      alert('Enter a value');
    } else {
      editBtn.classList.add('btn-edit');
      editBtn.innerHTML = 'Edit';

      deleteBtn.setAttribute('class', 'btn-delete');
      deleteBtn.innerText = 'Delete';

      elem.classList.add('element');
      elem.textContent = textVal;

      divContainer.classList.add('container');
      divContainer.appendChild(elem);
      divContainer.appendChild(editBtn);
      divContainer.appendChild(deleteBtn);

      section.appendChild(divContainer);

      inputText.value = '';

      deleteBtn.addEventListener('click', function () {
        divContainer.remove();
      });

      // Editing and Saving
      let editCont = false;

      const editable = () => {
        elem.contentEditable = 'true';
        editCont = true;
        editBtn.innerHTML = 'Done';
        elem.style.backgroundColor = 'white';
        elem.style.paddingTop = '5px';
        elem.style.paddingBottom = '5px';
      };

      const unEditable = () => {
        elem.contentEditable = 'false';
        editCont = false;
        editBtn.innerHTML = 'Edit';
        elem.style.backgroundColor = '';
        elem.style.padding = '0';
      };

      const editToggle = () => {
        editCont ? unEditable() : editable();
      };

      editBtn.addEventListener('click', editToggle);
    }
  }

  btn.addEventListener('click', addToList);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
      addToList();
    }
  });
};
