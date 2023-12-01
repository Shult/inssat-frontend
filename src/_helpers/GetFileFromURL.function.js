import config from '../config.json'

 function GetFileFromURL(fileName) {
    return config.development.API_URL + '/api_blog/uploads/' + fileName
}
async function getImageAsBase64(filename) {
    const apiUrl = config.development.API_URL;
    const fileUrl = apiUrl + '/api_blog/uploads/' + filename;
  
    try {
      const response = await fetch(fileUrl);
      const blob = await response.blob();
  
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64Data = reader.result;
          resolve(base64Data);
        };
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
    } catch (error) {
      console.error('Error loading image as Base64:', error);
      throw new Error('Error loading image as Base64');
    }
  }
  

export {
    GetFileFromURL, 
    getImageAsBase64
}