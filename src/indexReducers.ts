import { combineReducers } from 'redux';
import articleReducer from './_components/Article/Services/articleReducer';

export default combineReducers({
    articles: articleReducer
});
