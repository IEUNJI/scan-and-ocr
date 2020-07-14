import openConsole from '../utils/openConsole.js';

class ScanPage {
  constructor() {

  }

  testConsole() {
    openConsole();
  }

  initMediaStream() {
    navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } })
      .then(mediaStream => {
        console.log(mediaStream);
      });
  }

  init() {
    this.testConsole();
    this.initMediaStream();
  }
}

const scanPage = new ScanPage();
scanPage.init();
