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
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(mediaStream => {
        const video = document.querySelector('#camera-view');
        video.srcObject = mediaStream;
      });
  }

  init() {
    this.testConsole();
    this.initMediaStream();
  }
}

const scanPage = new ScanPage();
scanPage.init();
