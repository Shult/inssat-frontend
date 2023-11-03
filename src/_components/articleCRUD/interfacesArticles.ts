// interfaces.ts
export interface Article {
    id: string;
    title: string;
    imageUrl: string;
    snippet: string;
    content?: string
    link: string;
    tags: string[];
    publishDate: string;
    lastUpdate: string;
    status: "created" | "published" | "deleted";
    author?: string
}

export interface ArticleState {
    articles: Article[];
    loading: boolean;
    error: null | string;
}

type FetchArticlesRequestAction = {
    type: 'FETCH_ARTICLES_REQUEST';
};

type FetchArticlesSuccessAction = {
    type: 'FETCH_ARTICLES_SUCCESS';
    payload: Article[];
};

type FetchArticlesFailureAction = {
    type: 'FETCH_ARTICLES_FAILURE';
    payload: string; // message d'erreur
};

export type CreateArticleAction = {
    type: 'CREATE_ARTICLE';
    payload: Article;
};

export type UpdateArticleAction = {
    type: 'UPDATE_ARTICLE';
    payload: Article;
};

export type DeleteArticleAction = {
    type: 'DELETE_ARTICLE';
    payload: string; // UUID de l'article
};

export type GetArticleAction = {
    type: 'GET_ARTICLE';
    payload: string;
};

export type ArticleActions =
    | CreateArticleAction
    | UpdateArticleAction
    | DeleteArticleAction
    | FetchArticlesRequestAction
    | FetchArticlesSuccessAction
    | FetchArticlesFailureAction;
