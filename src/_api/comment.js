import {apiBlog} from './client'

const createComment = async (commentData) => {
    try {
      const response = await apiBlog.post('/comments', commentData);
  
      if (response.ok) {
        return response.data;
      } else {
        console.error('Error creating comment:', response);
        return null;
      }
    } catch (error) {
      console.error('Error creating comment:', error);
      return null;
    }
  };
  
//-------------------------------------------------------------------------
//-------------------------------------------------------------------------

const deleteComment = async (commentId) => {
    try {
      const response = await apiBlog.delete(`/comments/${commentId}`);
  
      if (response.ok) {
        return true;
      } else {
        console.error('Error deleting comment:', response);
        return false;
      }
    } catch (error) {
      console.error('Error deleting comment:', error);
      return false;
    }
  };
  
//-------------------------------------------------------------------------
//-------------------------------------------------------------------------

  export {
    createComment,
    deleteComment
  };