import {getCategories} from "../../_api/category";
import {getArticlesWithDetails, getLastSharedArticle} from "../../_api/article";
import {fetchRSSFeed} from "./ArticlesEnssat/articleEnssatServices";
import {ArticleDetails} from "./Services/interfacesArticles";
import {
    ArticleEnssatToArticleDetails,
    ArticleInssatToArticleDetails,
    SortArticleByDate
} from "./Services/articleServices";


// ARTICLES
export const getArticlesCrossOrigin = () => fetchArticlesMultiOrigins()
export const getArticlesINSSAT = () => fetchArticlesINSSAT()


async function fetchArticlesMultiOrigins() {
    let allArticles: ArticleDetails[] = []
    const articlesInssat = await getArticlesWithDetails()
    const articlesEnssat = await fetchRSSFeed()
    if (articlesInssat.ok){
        ArticleInssatToArticleDetails(articlesInssat.data, allArticles)
    }
    ArticleEnssatToArticleDetails(articlesEnssat.articles, allArticles)
    SortArticleByDate(allArticles)
    return allArticles
}

async function fetchArticlesINSSAT() {
    let allArticles: ArticleDetails[] = []
    const articlesInssat = await getArticlesWithDetails()
    if (articlesInssat.ok){
        ArticleInssatToArticleDetails(articlesInssat.data, allArticles)
    }
    SortArticleByDate(allArticles)
    return allArticles
}



// LAST ARTICLE

export const getLastArticle = () => fetchLastArticle()

async function fetchLastArticle(): Promise<ArticleDetails> {
    const lastArticleResponse = await getLastSharedArticle();
    return lastArticleResponse.data
}



// CATEGORIES

export const extractCategories = () => fetchCategories()

async function fetchCategories() {
    const categoriesResponse = await getCategories();
    return categoriesResponse.data
}
