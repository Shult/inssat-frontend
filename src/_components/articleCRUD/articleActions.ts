// import axios from 'axios';
import {FETCH_ARTICLES_REQUEST, FETCH_ARTICLES_SUCCESS, FETCH_ARTICLES_FAILURE, CREATE_ARTICLE, DELETE_ARTICLE, UPDATE_ARTICLE} from './types';
import articles from '../../_data/articles.json';
import { Article, CreateArticleAction, UpdateArticleAction, DeleteArticleAction } from './interfacesArticles';

export const getArticles = () => {
    return {
        type: FETCH_ARTICLES_SUCCESS,
        payload: articles as Article[]
    };
};
// Avec la gestion d'erreur
// export const getArticles = () => {
//     return async (dispatch : any)=> {
//         dispatch({ type: FETCH_ARTICLES_REQUEST, payload:"" });
//         try{
//             dispatch({
//                 type: FETCH_ARTICLES_SUCCESS,
//                 payload: articles as Article[]
//             })
//         }catch (e){
//             dispatch({
//                 type: FETCH_ARTICLES_FAILURE,
//                 payload: "error"
//             })
//         }
//     };
// };

// When the API will be available
// export const getArticlesAPI = () => {
//     return async (dispatch: any) => {
//         dispatch({ type: 'FETCH_ARTICLES_REQUEST' });
//
//         try {
//             const response = await axios.get('YOUR_API_ENDPOINT_HERE');
//             dispatch({ type: 'FETCH_ARTICLES_SUCCESS', payload: response.data });
//         } catch (error) {
//             dispatch({ type: 'FETCH_ARTICLES_FAILURE', payload: error.message });
//         }
//     };
// };

export const createArticle = (article: Article): CreateArticleAction => ({
    type: CREATE_ARTICLE,
    payload: article,
});

export const updateArticle = (article: Article): UpdateArticleAction => ({
    type: UPDATE_ARTICLE,
    payload: article,
});

export const deleteArticle = (id: string): DeleteArticleAction => ({
    type: DELETE_ARTICLE,
    payload: id,
});
