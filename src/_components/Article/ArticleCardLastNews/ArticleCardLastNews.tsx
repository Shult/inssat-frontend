import React from "react";
import Link from "../../Clickable/Link";
import {Article} from "../Services/interfacesArticles";
import "./ArticleCardLastNews.css"
import {loadImage} from "../Services/articleServices";

const ArticleCardLastNews = () => {
    // const dispatch = useDispatch();
    // useEffect(() => { dispatch(getArticles()); }, [dispatch]);
    // const articles = useSelector((state: any) => state.articles.articles) as Article[];
    // const article = articles.pop() as Article;

    const article : Article = {
        "id": "EMPTY_ID",
        "title": "EMPTY TITLE",
        "imageUrl": "_imgArticles/worlds.jpg",
        "snippet": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        "link": "https://react.com",
        "tags": ["#NoTagFounded", "#ThereIsNoTag", "#WhereIsTag"],
        "publishDate": "03/11/2023",
        "lastUpdate": "03/11/2023",
        "status": "created",
        "author": "Sylvain MESTRE",
        "fromEnssat": false
    }

    return (
        <section className={"line w100 space-between"} id={"ArticleLastNews-Section"}>

            <article className={"line w66 items-center"} id={"ArticleLastNews-Article"}>

                <div className={"line w66"} id={"ArticleLastNews-Content"}>
                    <h4 className={"w100 self-start"}>
                        <Link className={'linkWhiteDark'} href={article.link} content={article.title}/>
                    </h4>
                    <p className={"line w100 self-stretch"}>{article.snippet}</p>
                    <p className={"w100 self-end"}>{article.author} {article.publishDate}</p>
                </div>

                <div className={"w33"}>
                    <img src={loadImage(article.imageUrl)} alt={article.title} className={"styleImgSide"}/>
                </div>
            </article>

            <article className={"line w33 items-center"} >
                <div className={"line w100"} id={"ArticleLastNews-DivTag"}>
                    <h4 className={"w100"}>Catégories</h4>
                    {article.tags.map((tag : any) => (
                        <Link key={tag} className={"buttonGold2 w75"} href={article.link} content={tag}/>
                    ))}
                </div>
            </article>

        </section>
    )
}
export default ArticleCardLastNews
