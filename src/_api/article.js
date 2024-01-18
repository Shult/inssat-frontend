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



const getFilteredArticles = async (filterOptions) => {
  try {
    const response = await client.post('/articles/filter', filterOptions);

    return response;
  } catch (error) {
    throw error;
  }
};


const getArticlesByCategory = async (id, page = 1, pageSize = 10) => {
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
        'Content-Type': 'multipart/form-data',
      },
    })
  };

const deleteArticle = (id) => {
    return client.delete(`/articles/${id}`, id, {
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
