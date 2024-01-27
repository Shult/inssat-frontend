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


const getFilteredArticles = async (filterOptions) => {
  try {
    const response = await apiBlog.post('/articles/filter', filterOptions);

    return response;
  } catch (error) {
    throw error;
  }
};


const getArticlesByCategory = async (id, page = 1, pageSize = 10) => {
  try {
    const response = await apiBlog.get(`/articles/category/${id}?pageSize=${pageSize}&page=${page}`);

    return response; 
  } catch (error) {
    throw error;
  }
};

const createArticle = (formData) => {
    return apiBlog.post('/articles', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  };

const deleteArticle = (id) => {
    return apiBlog.delete(`/articles/${id}`, id, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  };


  const getCommentsForArticle = async (id) => {
    try {
      const response = await client.get(`/articles/${id}/comments`);
  
      if (response.ok) {
        // Extract the comments from the response data
        const comments = response.data;
        return comments;
      } else {
        // Handle errors when the request is not successful
        console.error('Error fetching comments:', response.problem);
        return null;
      }
    } catch (error) {
      // Handle other errors (e.g., network issues)
      console.error('Error fetching comments:', error);
      return null;
    }
  };

export {
    getArticleById,
    getLastSharedArticle,
    getArticlesWithDetails,
    getArticleWithDetails,
    createArticle,
    deleteArticle,
    getArticlesByCategory,
    update,
    getFilteredArticles,
    getCommentsForArticle
    
}
