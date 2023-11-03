import React from 'react';
import "./ArticleCardHorizontal.css"
import "./ArticleCardHorizontal.css"
import Link from "../Clickable/Link";


// Used to load the image, because I faced an issue when I past directly the images
function loadImage(imagePath: string) {
    try {
        return require(`../../../public/_assets/${imagePath}`);
    } catch (err) {
        return '';
    }
}

function ArticleCardHorizontal(props : any) {
    const { article } = props;

    return (
        <article className={"line space-between items-center"} id="styleArticle">
            <div className={"w33 self-stretch"}>
                <img src={loadImage(article.imageUrl)} alt={article.title} className={"styleImgSide"}/>
            </div>

            <div className={"line w66"} id="styleDivContent">

                <h2 className={"w100"}>
                    <Link key={article.id} href={article.link} content={article.title}/>
                </h2>
                <p className={"w100"}>{article.snippet}</p>

                <div className={"line w100 space-around"} id={"styleDivContentTag"}>
                    {article.tags.map((tag : any) => (
                        <Link key={tag} className={"buttonWhite"} href={article.link} content={tag}/>
                    ))}
                </div>

                <div className={"line w100 space-around items-center"}>
                    <img className={"w33"} src={loadImage(article.imageUrl)} alt={article.title} id="styleImgBubble"/>
                    <div className={"w66"}>
                        <p className={"w100"}>
                            {article.author}Sylvain MESTRE
                            <br/>
                            {article.publishDate}
                        </p>
                    </div>
                </div>

            </div>
        </article>
    );
}

export default ArticleCardHorizontal;
