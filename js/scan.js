import openConsole from '../utils/openConsole.js';

class ScanPage {
  constructor() {

  }

  testConsole() {
    openConsole();
  }

  initMediaStream() {
    navigator.mediaDevices.enumerateDevices().then(res => {
      console.log(res);
    });
  }

  init() {
    this.testConsole();
    this.initMediaStream();
  }
}

const scanPage = new ScanPage();
scanPage.init();
