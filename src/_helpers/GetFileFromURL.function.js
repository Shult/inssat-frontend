import config from '../config.json'

 function GetFileFromURL(fileName) {
    return config.development.API_URL + '/api_blog/uploads/' + fileName
}



export {
    GetFileFromURL
}