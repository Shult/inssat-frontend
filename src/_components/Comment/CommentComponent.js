import React, { useState, useEffect } from 'react';
import { getCommentsForArticle } from '../../_api/article'; 
import { createComment, deleteComment } from '../../_api/comment';
import UserServices from '../../services/UserServices';
import { ActionButton } from '../ToolBox/Forms';
import { Spinner } from 'react-bootstrap';

const CommentComponent = ({ id, setCommentsCounter }) => { 
  const {sub: user_id, family_name = "Me", given_name = "yu" } = UserServices.getTokenParsed();
  
  const [comment, setComment] = useState({
    commentText: '',
  });

  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchComments = async () => {
      setLoading(true);
      const fetchedComments = await getCommentsForArticle(id);
      if (fetchedComments) {
        console.log(fetchedComments)
        setComments(fetchedComments);
        setCommentsCounter(fetchedComments.length);
      }
      setLoading(false);
    };

    fetchComments();
  }, [id]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (comment.commentText.length === 0)
      return alert("Votre commentaire est vide");
  
    const newCommentData = {
      title: 'Comment Title',  // TODO: Add an input for comment title if needed
      content: comment.commentText,
      is_published: true,
      article_id: id,
      user_id: user_id,
    };

    const createdComment = await createComment(newCommentData);
  
    if (createdComment) {
      createdComment.user = {
        FIRST_NAME: given_name,
        LAST_NAME: family_name
      };
      setComments([...comments, createdComment]);
      setComment({ commentText: '' });
      setCommentsCounter((prevCount) => prevCount + 1);
    } else {
      alert("creation - erreur")
    }
  };

  const handleDeleteComment = async (commentId) => {
    // Attempt to delete the comment
    const isDeleted = await deleteComment(commentId);

    if (isDeleted) {
      // Update the comments state to reflect the deletion
      setComments((prevComments) => prevComments.filter(comment => comment.id !== commentId));
      setCommentsCounter((prevCount) => prevCount - 1);
    } else {
      alert("suppression - erreur")
    }
  };

  return (
    <div className="row">
    <div className="col-md-12">
      <div className="card">
        <div className="card-header">
          Commentaires |&nbsp;<label className='btn btn-primary btn-sm' style={{background:'var(--gold)', border:'0px'}} htmlFor='comment-section'>ajouter un commentaire</label>
        </div>
        <div className="card-body">
          {comments && comments.length > 0 && comments.map((existingComment, index) => (
            <div key={index}>
              <div className="media">
                <div className="media-body">
                  <h6 className="mt-0">{existingComment?.user?.FIRST_NAME} {existingComment?.user?.LAST_NAME}</h6>
                  {existingComment.content}
                </div>
              </div>
              <div className="mt-2 text-muted">
                {new Date(existingComment.createdAt).toLocaleString()}
              </div>
             
             {existingComment?.user_id === user_id &&
              <div className="mt-2">
                {/* TODO: Front add a delete icon  & adjust the layout */}
                <button className onClick={() => handleDeleteComment(existingComment.id)}>supprimer commentaire</button>
              </div>
             }
              {index < comments.length - 1 && <hr />}
            </div>
          ))}

          <div className="media mt-3">
            <div className="media-body">
              <h6 className="mt-0">{comment?.user?.FIRST_NAME} {comment?.user?.LAST_NAME}</h6>
              <form>
                <div className="form-group">
                  <textarea
                    id='comment-section'
                    className="form-control"
                    rows="3"
                    placeholder="Ajouter votre commentaire"
                    value={comment.commentText}
                    onChange={(e) => setComment({ ...comment, commentText: e.target.value })}
                  />
                </div>

                <ActionButton active={!loading} variant="primary" onClick={handleCommentSubmit}>
                  {loading ? (
                    <>
                      <Spinner animation="border" size="sm" className="me-2" />
                      Publication en cours...
                    </>
                  ) : (
                    'Publier votre commentaire'
                  )}
                </ActionButton>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};

export default CommentComponent;
