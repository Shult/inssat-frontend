export type CategoryType = {
    _attributes: {
        scheme: string;
        term: string;
    }
}

type LinkType = {
    _attributes: { href: string };
}[];

export type Article = {
    title: { _text: string };
    published: { _text: string };
    link: LinkType;
    content: { _text: string };
    author: { name: { _text: string } };
    category: CategoryType[];
};

export type ArticleState = {
    articles: Article[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: null | string;
};