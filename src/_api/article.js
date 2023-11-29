import client from './client'

const getArticleById = (id) => client.get(`/articles/${id}`)
const getLastSharedArticle = () => client.get('/articles/last-shared-article')
const getArticlesWithDetails =  () => client.get('/articles/details')
const getArticleWithDetails =  (id) => client.get(`/articles/details/${id}`)

const createArticle = (formData) => {
    return client.post('/articles', formData, {
      headers: {
        'Content-Type': 'multipart/form-data', // Ensure correct headers for form data
      },
    });
  };

  
export {
    getArticleById,
    getLastSharedArticle,
    getArticlesWithDetails,
    getArticleWithDetails,
    createArticle
}
