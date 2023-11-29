import client from './client'

const getFile = (fileName) =>{
    console.log(fileName)
    return client.get('/uploads/'+fileName)
}
 
export {
    getFile
}
