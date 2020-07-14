import openConsole from '../utils/openConsole.js';

class ScanPage {
  constructor() {
    this.operateArea = document.querySelector('.camera-operate');
    this.select = document.querySelector('#camera-picker');
    this.startBtn = document.querySelector('#camera-start');
    this.video = document.querySelector('#camera-view');

    this.mediaStream = null;
    this.imageCapture = null;
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
    this.mediaStream?.getTracks().forEach(track => track.stop());
    const constraints = this.getConstraints();
    navigator.mediaDevices.getUserMedia(constraints).then(mediaStream => {
      this.mediaStream = mediaStream;
      this.video.srcObject = mediaStream;

      const mediaStreamTrack = mediaStream.getVideoTracks()[0];
      this.imageCapture = new ImageCapture(mediaStreamTrack);
      this.scan();
    });
  }

  blobToBase64 = blob => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const base64 = reader.result;
        resolve(base64);
      };
      reader.readAsDataURL(blob);
    });
  }

  resolveQRCode = base64 => {
    return new Promise((resolve, reject) => {
      window.qrcode.callback = scanText => {
        if (scanText === 'error decoding QR Code') {
          reject(scanText);
        } else {
          resolve(scanText);
        }
      };
      window.qrcode.decode(base64);
    });
  }

  async scan() {
    const blob = await this.imageCapture.takePhoto();
    const base64 = await this.blobToBase64(blob);
    try {
      const scanText = await this.resolveQRCode(base64);
      alert(scanText);
    } catch (e) {
      this.scan();
    }
  }

  async init() {
    this.testConsole();
    await this.initDevices();
    this.bindListeners();
  }
}

const scanPage = new ScanPage();
scanPage.init();
