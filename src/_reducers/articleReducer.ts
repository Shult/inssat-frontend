import { GET_ARTICLES } from '../_actions/types';

const initialState = {
    articles: []
};

export default function articleReducer(state = initialState, action: any) {
    switch (action.type) {
        case GET_ARTICLES:
            return {
                ...state,
                articles: action.payload
            };
        default:
            return state;
    }
}
