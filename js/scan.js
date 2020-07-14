import openConsole from '../utils/openConsole.js';

class ScanPage {
  constructor() {
    this.operate = document.querySelector('.camera-operate');
    this.select = document.querySelector('#camera-picker');
    this.video = document.querySelector('#camera-view');
  }

  testConsole() {
    openConsole();
  }

  initDevices() {
    navigator.mediaDevices.enumerateDevices().then(devices => {
      const videoDevices = devices.filter(device => device.kind === 'videoinput');
      console.log(videoDevices);
      this.select.insertAdjacentHTML('beforeend', videoDevices.reduce((acc, device) => {
        acc += `<option value="${device.deviceId}">${device.label}</option>`;
        return acc;
      }, ''));
      this.operate.style.display = 'block';
    });
  }

  initMediaStream() {
    navigator.mediaDevices.getUserMedia({ video: true }).then(mediaStream => {
      this.video.srcObject = mediaStream;
    });
  }

  init() {
    this.testConsole();
    this.initDevices();
    this.initMediaStream();
  }
}

const scanPage = new ScanPage();
scanPage.init();
