import client from './client'
import UserServices from "../services/UserServices";


const getFile = (fileName) =>{
    console.log(fileName)
    return client.get('/uploads/'+fileName)
}
const getDefaultFile = async (fileName) =>{
    const resp =  await client.get('/uploads/default/'+fileName,{}, {
        responseType: 'blob' ,
      })
    const blobURL = URL.createObjectURL(resp.data);
    console.log(fileName)
    console.log(blobURL)
    return blobURL;
}

const getPublicFile = async (fileName,id=UserServices.getTokenParsed().sub) =>{
  console.log("__________"+id)
    const resp =  await client.get('/uploads/'+id+'/publicFiles/'+fileName,{}, {
        responseType: 'blob' ,
      })
      const blobURL = URL.createObjectURL(resp.data);
      console.log(fileName)
      console.log(blobURL)
      return blobURL;
}

const getFilesPaginated = async (pageNumber = 1) => {
    try {
      const userID = UserServices.getTokenParsed().sub;
  
      const resp = await client.get(`/uploads/${userID}/${pageNumber}`, {
        responseType: 'json',
      });
  
      const fileNames = resp.data.files;

      console.log('Fetched file names:', fileNames);
  
      return fileNames;
    } catch (error) {
      console.error('Error fetching file names:', error);
      throw error;
    }
  };

  const uploadFile = async (file) => {
    try {
      // const userID = UserServices.getTokenParsed().sub;
  
      const formData = new FormData();
      formData.append('file', file);
  
      const resp = await client.post(`/uploads`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      const fileName = resp.data.fileName;
      console.log('Uploaded file:', fileName);
  
      return fileName;
    } catch (error) {
      console.error('Error uploading file:', error);
      throw error;
    }
  };
 

export {
    getFile,
    getDefaultFile,
    getPublicFile,
    getFilesPaginated,
    uploadFile
}
