import {apiBlog} from './client'

const getArticleById = (id) => apiBlog.get(`/articles/${id}`)
const update = (id, articleData) => {
  return apiBlog.put(`/articles/${id}`, articleData, {
    headers: {
      'Content-Type': 'application/json', // Ensure correct headers for form data
    },
  });
};

const getLastSharedArticle = () => apiBlog.get('/articles/last-shared-article')
const getArticlesWithDetails =  () => apiBlog.get('/articles/details')
const getArticleWithDetails =  (id) => apiBlog.get(`/articles/details/${id}`)




const getArticlesByCategory =  (id) => apiBlog.get(`/articles/category/${id}`)

const createArticle = (formData) => {
    return apiBlog.post('/articles', formData, {
      headers: {
        'Content-Type': 'multipart/form-data', // Ensure correct headers for form data
      },
    })
  };

const deleteArticle = (id) => {
    return apiBlog.delete(`/articles/${id}`, id, {
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
