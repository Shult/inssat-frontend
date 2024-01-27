import { getAllStudentMaTutors } from "../../../_api/student-ma-tutors"
import { IApprentieceshipTickets, IDataSuivi } from "./apprenticeshipTickets.interface"

/*
export const getArticles = () => fetchArticlesMultiOrigins()

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
*/
export const getDataStudentExtended = () => fetchDataStudentExtended()

async function fetchDataStudentExtended(){
    let dataStudentExtended: IDataSuivi[] = []
    const allStudentMaTutors = await getAllStudentMaTutors()
    return dataStudentExtended

}

export const getTickets = () => fetchTickets()

async function fetchTickets(){
    let tickets: IApprentieceshipTickets[] = []
    
    return tickets

}

