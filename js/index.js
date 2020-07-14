import openConsole from '../utils/openConsole.js';

class IndexPage {
  constructor() {
    this.navBtns = document.querySelectorAll('.nav-btns');
  }

  testConsole() {
    openConsole();
  }

  bindListeners() {
    this.navBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        location.assign(`${btn.name}.html${location.search}`);
      });
    });
  }

  init() {
    this.testConsole();
    this.bindListeners();
  }
}

const indexPage = new IndexPage();
indexPage.init();
