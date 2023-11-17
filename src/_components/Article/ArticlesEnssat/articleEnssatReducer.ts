// _reducers/articleReducer.js
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {fetchRSSFeed} from "./articleEnssatServices";
import {ArticleState} from "./articleEnssatInterfaces";

const initialState: ArticleState = {
    articles: [],
    status: 'idle',
    error: null
};

export const fetchArticles: any = createAsyncThunk(
    'articles/fetchArticles',
    async () => {
        return await fetchRSSFeed();
    }
);

const articlesSlice = createSlice({
    name: 'articles',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchArticles.pending, state => {
                state.status = 'loading';
            })
            .addCase(fetchArticles.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.articles = action.payload.articles;
            })
            .addCase(fetchArticles.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    }
});

export default articlesSlice.reducer;
