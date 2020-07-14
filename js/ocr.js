import openConsole from '../utils/openConsole.js';

class OcrPage {
  constructor() {
    this.file = document.querySelector('#file');
  }

  testConsole() {
    openConsole();
  }

  bindListeners() {
    this.file.addEventListener('change', async () => {
      const files = [...file.files];
      const base64s = await Promise.all(files.map(file => this.fileToBase64(file)));
      this.file.insertAdjacentHTML('afterend', base64s.reduce((acc, base64) => {
        acc += `<p style="width: 100%; line-height: 28px; overflow: auto;">${base64}</p>`;
        return acc;
      }, ''));
    });
  }

  fileToBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const base64 = reader.result;
        resolve(base64);
      };
      reader.readAsDataURL(file);
    });
  }

  init() {
    this.testConsole();
    this.bindListeners();
  }
}

const ocrPage = new OcrPage();
ocrPage.init();
