import openConsole from './utils/openConsole.js';

openConsole();

const btns = document.querySelectorAll('.btns');

btns.forEach(btn => {
  btn.addEventListener('click', () => {
    location.assign(`${btn.name}.html${location.search}`);
  });
});
