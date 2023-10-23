import { GET_ARTICLES } from './types';
import articles from '../_data/articles.json';
import { Article } from '../_interfaces';

export const getArticles = () => {
    return {
        type: GET_ARTICLES,
        payload: articles as Article[]
    };
};
