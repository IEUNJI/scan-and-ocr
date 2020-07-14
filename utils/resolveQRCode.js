const resolveQRCode = base64 => {
  return new Promise((resolve, reject) => {
    window.qrcode.callback = scanText => {
      scanText === 'error decoding QR Code' ? reject(scanText) : resolve(scanText);
    };
    window.qrcode.decode(base64);
  });
};

export default resolveQRCode;
