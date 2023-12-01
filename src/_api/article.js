import client from './client'

const getArticleById = (id) => client.get(`/articles/${id}`)
const update = (id, articleData) => {
  return client.put(`/articles/${id}`, articleData, {
    headers: {
      'Content-Type': 'application/json', // Ensure correct headers for form data
    },
  });
};

const getLastSharedArticle = () => client.get('/articles/last-shared-article')
const getArticlesWithDetails =  () => client.get('/articles/details')
const getArticleWithDetails =  (id) => client.get(`/articles/details/${id}`)




const getArticlesByCategory =  (id) => client.get(`/articles/category/${id}`)

const createArticle = (formData) => {
    return client.post('/articles', formData, {
      headers: {
        'Content-Type': 'multipart/form-data', // Ensure correct headers for form data
      },
    })
  };

const deleteArticle = (id) => {
    return client.delete(`/articles/${id}`, id, {
      headers: {
        'Content-Type': 'multipart/form-data', // Ensure correct headers for form data
      },
    })
  };


export {
    getArticleById,
    getLastSharedArticle,
    getArticlesWithDetails,
    getArticleWithDetails,
    createArticle,
    deleteArticle,
    getArticlesByCategory,
    update
}
