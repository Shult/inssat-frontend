import { combineReducers } from 'redux';
import articleReducer from './_components/articleCRUD/articleReducer';

export default combineReducers({
    articles: articleReducer
});
