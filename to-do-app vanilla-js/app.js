'use strict';

const btn = document.querySelector('.add-btn');
const container = document.querySelector('.container');
const inputText = document.getElementById('myText');
const section = document.querySelector('section');

btn.addEventListener('click', function (e) {
  e.preventDefault();

  const textVal = inputText.value;

  if (textVal === '') {
    alert('Enter a value');
  } else {
    const elem = document.createElement('div');
    elem.classList.add('container');

    elem.innerHTML = textVal;
    section.append(elem);

    inputText.value = '';
  }
});
