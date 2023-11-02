import { ArticleState, ArticleActions } from './interfacesArticles';

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

const  articleReducerMook = (state = initialState, action: ArticleActions): ArticleState => {
    switch (action.type) {
        case 'FETCH_ARTICLES_REQUEST':
            return {
                ...state,
                loading: true,
                error: null
            };
        case 'FETCH_ARTICLES_SUCCESS':
            return {
                ...state, articles:
                action.payload,
                loading: false
            };
        case 'FETCH_ARTICLES_FAILURE':
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case 'CREATE_ARTICLE':
            return {
                ...state,
                articles: [...state.articles, action.payload]
            };
        case 'UPDATE_ARTICLE':
            return {
                ...state,
                articles: state.articles.map(article =>
                    article.id === action.payload.id ? action.payload : article
                ),
            };
        case 'DELETE_ARTICLE':
            return {
                ...state,
                articles: state.articles.filter(article => article.id !== action.payload)
            };
        default:
            return state;
    }
};
export default articleReducerMook;


/**
 * Louis' piece of advice: As our data came from a fake dataset, better to call it "mock"
 * Likewise, when will have a link to a real DB, better to call it with DB's name
 */

// const  articleReducerMariaDB = (state = initialState, action: ArticleActions): ArticleState => {};
// export default articleReducerMariaDB;
