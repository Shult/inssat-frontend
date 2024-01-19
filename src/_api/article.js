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




const getArticlesByCategory = async (id, page = 1, pageSize = 10) => {
  console.log("äsdasdasdasdasdsa")
  console.log(id)
  console.log(page)
  console.log(pageSize)
  console.log(id)
  console.log("äsdasdasdasdasdsa")
  try {
    const response = await client.get(`/articles/category/${id}?pageSize=${pageSize}&page=${page}`);

    return response; 
  } catch (error) {
    throw error;
  }
};

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
