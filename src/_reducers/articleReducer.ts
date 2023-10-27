import {FETCH_ARTICLES_REQUEST, FETCH_ARTICLES_SUCCESS, FETCH_ARTICLES_FAILURE} from '../_actions/types';
import { ArticleState, ArticleActions } from '../_interfaces/interfacesArticles';

const initialState: ArticleState = {
    articles: [],
    loading: false,
    error: null,
};

// export default function articleReducer(state = initialState, action: any) {
//     switch (action.type) {
//         case GET_ARTICLES:
//             return {
//                 ...state,
//                 articles: action.payload
//             };
//         default:
//             return state;
//     }
// }

const  articleReducer = (state = initialState, action: ArticleActions): ArticleState => {
    switch (action.type) {
        case 'FETCH_ARTICLES_REQUEST':
            return { ...state, loading: true, error: null };
        case 'FETCH_ARTICLES_SUCCESS':
            return { ...state, articles: action.payload, loading: false };
        case 'FETCH_ARTICLES_FAILURE':
            return { ...state, loading: false, error: action.payload };
        case 'CREATE_ARTICLE':
            return { ...state, articles: [...state.articles, action.payload] };
        case 'UPDATE_ARTICLE':
            return {
                ...state,
                articles: state.articles.map(article =>
                    article.id === action.payload.id ? action.payload : article
                ),
            };
        case 'DELETE_ARTICLE':
            return { ...state, articles: state.articles.filter(article => article.id !== action.payload) };
        default:
            return state;
    }
};


export default articleReducer;
