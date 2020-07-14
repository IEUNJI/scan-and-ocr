const blobToBase64 = blob => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result;
      resolve(base64);
    };
    reader.readAsDataURL(blob);
  });
};

export default blobToBase64;
