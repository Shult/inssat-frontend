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
    fromEnssat: boolean;
}
export interface ArticleDetails {
    id: number;
    title: string;
    description: string;
    thumbnail: string;
    author_id: string;
    published_at: string;
    article_tags: string[];
    category: {
        title: string;
    };
    author: {
        ID: string;
        FIRST_NAME: string | null;
        LAST_NAME: string | null;
    };
    fromEnssat: boolean;
    link: string
}

export interface Article2 {
    author_id: string;
    category_id: string[];
    comment_authorized: boolean;
    content: string;
    createdAt: string;
    description:string;
    flag_count: number;
    id: number;
    is_blacklisted: boolean;
    is_pinned: boolean;
    like_count:number;
    principal_image: string;
    published_at: string;
    status: string;
    thumbnail: string;
    title: string;
    updatedAt: string;
    fromEnssat: boolean
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
