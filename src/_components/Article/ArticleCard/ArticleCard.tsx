import React from 'react';
import "./articleCard.css"
import Link from "../../Clickable/Link";
import {extractFirstImageLink, formatDateInFrench} from "../Services/articleServices";

function ArticleCard(props : any) {
    const { article } = props;

    // Different printing for the article from Inssat and Enssat
    if(article.fromEnssat){
        // condition
        if(article.author_id === "Unknown"){
            article.author.FIRST_NAME = "Blog"
            article.author.LAST_NAME = "ENSSAT"
        }
        return (
            <article className={"line space-between items-center"} id="styleArticle">
                <div className={"w33 self-stretch"}>
                    <img src={extractFirstImageLink(article.thumbnail)} alt={article.title} className={"styleImgSide"}/>
                </div>

                <div className={"line w66"} id="styleDivContent">

                    <h2 className={"w100"}>
                        <Link key={article.id} href={article.link} content={article.title}/>
                    </h2>

                    <div className={"line w100"} id={"styleDivContentTag"}>
                        {article.article_tags.slice(-4).map((tag : any) => (
                            <Link key={tag} className={"buttonWhite"} href={article.content} content={tag}/>
                        ))}
                    </div>

                    <div className={"line w100 space-around items-center"}>
                        <img className={"w33"} src={extractFirstImageLink("<div></div>")} alt={article.title} id="styleImgBubble"/>
                        <div className={"w66"}>
                            <p className={"w100"}>
                                {article.author?.FIRST_NAME} {article.author?.LAST_NAME}
                                <br/>
                                {formatDateInFrench(article.published_at)}
                            </p>
                        </div>
                    </div>
                </div>
            </article>
        );
    } else {

        console.log(article.thumbnail)
        return (
            <article className={"line space-between items-center"} id="styleArticle">
                <div className={"w33 self-stretch"}>
                    <img src={"http://localhost:5000/api_blog/uploads/"+article.thumbnail} alt={article.title} className={"styleImgSide"}/>
                </div>

                <div className={"line w66"} id="styleDivContent">

                    <h2 className={"w100"}>
                        <Link key={article.id} href={article.link} content={article.title}/>
                    </h2>
                    <p className={"w100"}>{article.description}</p>

                    <div className={"line w100 space-around"} id={"styleDivContentTag"}>
                        {article.article_tags.map((tag : any) => (
                            <Link key={tag} className={"buttonWhite"} href={article.link} content={tag}/>
                        ))}
                    </div>

                    <div className={"line w100 space-around items-center"}>
                        <img className={"w33"} src={extractFirstImageLink("<div></div>")} alt={article.title} id="styleImgBubble"/>
                        <div className={"w66"}>
                            <p className={"w100"}>
                                {article.author?.FIRST_NAME} {article.author?.LAST_NAME}
                                <br/>
                                {formatDateInFrench(article.published_at)}
                            </p>
                        </div>
                    </div>

                </div>
            </article>
        );
    }

}

export default ArticleCard;
