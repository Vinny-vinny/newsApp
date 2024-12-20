import {createSlice} from "@reduxjs/toolkit";
import api from "../utils/api";


export const newsReducer = createSlice({
    name: "news",
    initialState: {
        articles: [],
        loading: false,
        success: false,
        error: null,
        pagination: {
            total: 0,
            per_page: 10,
            current_page: 1,
            last_page: 1,
            first_item: 1,
            last_item: 10,
            next_page_url: null,
            prev_page_url: null,
        },
        singleArticle: null ,
        singleArticleLoading: false,
        singleArticleError: null,
    },
    prev_page_url: null,
    reducers: {
        fetchNewsStart: (state) => {
            state.loading = true;
            state.success = false;
            state.error = null;
        },
        fetchNewsSuccess: (state, action) => {
            state.loading = false;
            state.success = true;
            state.articles = action.payload.data;
            state.pagination = {
                total: action.payload.pagination.total,
                count: action.payload.pagination.count,
                per_page: action.payload.pagination.per_page,
                current_page: action.payload.pagination.current_page,
                last_page: action.payload.pagination.last_page,
                first_item: action.payload.pagination.first_item,
                last_item: action.payload.pagination.last_item,
                next_page_url: action.payload.pagination.next_page_url,
                prev_page_url: action.payload.pagination.prev_page_url,
            };
        },
        fetchNewsFailure: (state, action) => {
            state.loading = false;
            state.success = false;
            state.error = action.payload;
        },
        resetNewsState: (state) => {
            state.articles = [];
            state.loading = false;
            state.success = false;
            state.error = null;
            state.pagination = {
                total: 0,
                count: 0,
                per_page: 10,
                current_page: 1,
                last_page: 1,
                first_item: 1,
                last_item: 10,
                next_page_url: null,
                prev_page_url: null,
            };
        },
        fetchSingleArticleStart: (state) => {
            state.singleArticleLoading = true;
            state.singleArticleError = null;
        },
        fetchSingleArticleSuccess: (state, action) => {
            state.singleArticleLoading = false;
            state.singleArticle = action.payload.data;
        },
        fetchSingleArticleFailure: (state, action) => {
            state.singleArticleLoading = false;
            state.singleArticleError = action.payload;
        },
    },
});

export const {
    fetchNewsStart,
    fetchNewsSuccess,
    fetchNewsFailure,
    resetNewsState,
    fetchSingleArticleStart,
    fetchSingleArticleSuccess,
    fetchSingleArticleFailure
} = newsReducer.actions;
export const fetchNews = (page = 1) => async (dispatch) => {
    dispatch(fetchNewsStart());
    try {
        const response = await api.get(`/articles?page=${page}`);
        dispatch(fetchNewsSuccess(response.data));
    } catch (error) {
        dispatch(fetchNewsFailure(error.response?.data || "Failed to fetch news articles"));
    }
};

export const fetchSingleArticle = (articleId) => async (dispatch) => {
    dispatch(fetchSingleArticleStart());
    try {
        const response = await api.get(`/articles/${articleId}`);
        dispatch(fetchSingleArticleSuccess(response.data.data));
    } catch (error) {
        dispatch(fetchSingleArticleFailure(error.response?.data || "Failed to fetch the article"));
    }
};

export default newsReducer.reducer;