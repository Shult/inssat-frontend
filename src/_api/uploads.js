import {apiBlog} from './client'

const getFile = (fileName) =>{
    console.log(fileName)
    return apiBlog.get('/uploads/'+fileName)
}
 
export {
    getFile
}
