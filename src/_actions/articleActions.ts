// import axios from 'axios';
import {CREATE_ARTICLE, DELETE_ARTICLE, GET_ARTICLES, UPDATE_ARTICLE} from './types';
import articles from '../_data/articles.json';
import { Article, CreateArticleAction, UpdateArticleAction, DeleteArticleAction } from '../_interfaces/interfacesArticles';

export const getArticles = () => {
    return {
        type: GET_ARTICLES,
        payload: articles as Article[]
    };
};

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

export const deleteArticle = (id: number): DeleteArticleAction => ({
    type: DELETE_ARTICLE,
    payload: id,
});