import axios from "axios";
import {
    FETCH_ARTICLES_REQUEST,
    FETCH_ARTICLES_SUCCESS,
    FETCH_ARTICLES_FAILURE,
    CREATE_ARTICLE,
    DELETE_ARTICLE,
    UPDATE_ARTICLE
} from './articleActionsTypes';

import {
    Article,
    CreateArticleAction,
    UpdateArticleAction,
    DeleteArticleAction
} from './interfacesArticles';
import config from '../../../config.json';
const URL = config.local.API_URL;

// API TEMPORAIRE
export const getArticles = () : any => {
    return (dispatch: any) => {
        dispatch({ type: FETCH_ARTICLES_REQUEST });
        axios.get(`${URL}/articles`)
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

export const getArticlesREALAPI = () : any => {
    return (dispatch: any) => {
        dispatch({ type: FETCH_ARTICLES_REQUEST });
        axios.get(`${URL}/api_blog/articles/details`)
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
