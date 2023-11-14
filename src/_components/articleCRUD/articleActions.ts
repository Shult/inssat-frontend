// import axios from 'axios';
import {
    FETCH_ARTICLES_REQUEST,
    FETCH_ARTICLES_SUCCESS,
    FETCH_ARTICLES_FAILURE,
    CREATE_ARTICLE,
    DELETE_ARTICLE,
    UPDATE_ARTICLE,
    GET_ARTICLE
} from './types';

import articles from '../../_data/articles.json';

import {
    Article,
    CreateArticleAction,
    UpdateArticleAction,
    DeleteArticleAction,
    GetArticleAction
} from './interfacesArticles';
import axios from "axios";

// export const getArticles = () => {
//     return {
//         type: FETCH_ARTICLES_SUCCESS,
//         payload: articles as Article[]
//     };
// };
export const getArticles = () : any => {
    return (dispatch: any) => {
        dispatch({ type: FETCH_ARTICLES_REQUEST });
        axios.get('http://localhost:3001/articles')
            .then(response => {
                dispatch({
                    type: FETCH_ARTICLES_SUCCESS,
                    payload: response.data as Article[]
                });
            })
            .catch(error => {
                dispatch({
                    type: FETCH_ARTICLES_FAILURE,
                    payload: error.message
                });
            });
    };
};

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

export const getArticle = (id: string): GetArticleAction => ({
    type: GET_ARTICLE,
    payload: id,
});
