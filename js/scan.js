import openConsole from '../utils/openConsole.js';

class ScanPage {
  constructor() {
    this.operateArea = document.querySelector('.camera-operate');
    this.select = document.querySelector('#camera-picker');
    this.startBtn = document.querySelector('#camera-start');
    this.video = document.querySelector('#camera-view');
  }

  testConsole() {
    openConsole();
  }

  initDevices() {
    return navigator.mediaDevices.enumerateDevices().then(devices => {
      const videoDevices = devices.filter(device => device.kind === 'videoinput');
      this.select.insertAdjacentHTML('beforeend', videoDevices.reduce((acc, device) => {
        acc += `<option value="${device.deviceId}">${device.label}</option>`;
        return acc;
      }, ''));
      this.operateArea.style.display = 'block';
    });
  }

  bindListeners() {
    this.startBtn.addEventListener('click', () => {
      this.initMediaStream();
    });
  }

  getConstraints() {
    const deviceId = this.select.value;
    return {
      video: {
        deviceId: {
          exact: deviceId
        }
      }
    };
  }

  initMediaStream() {
    const constraints = this.getConstraints();
    navigator.mediaDevices.getUserMedia(constraints).then(mediaStream => {
      this.video.srcObject = mediaStream;
    });
  }

  async init() {
    this.testConsole();
    await this.initDevices();
    this.bindListeners();
  }
}

const scanPage = new ScanPage();
scanPage.init();
