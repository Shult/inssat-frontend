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

const extractFirstImageLink = (htmlString : any) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, "text/html");
    const imgElement = doc.querySelector("a");
    // console.log("imgElement = " + imgElement)
    if (imgElement) {
        return imgElement.href;
    }
    return loadImage("_user/Unknown.png");
}

function formaterDateEnFrancaisAvecJour(dateString: string): string {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
        weekday: 'long',
        day: '2-digit',
        month: 'long',
        year: 'numeric'
    };

    const dateFormatee = date.toLocaleDateString('fr-FR', options);
    const heure = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    return `Publiée le ${dateFormatee} à ${heure}h${minutes}`;
}

function ArticleCardHorizontal(props : any) {
    const { article } = props;

    if(article.fromEnssat){
        return (
            <article className={"line space-between items-center"} id="styleArticle">
                <div className={"w33 self-stretch"}>
                    <img src={extractFirstImageLink(article.imageUrl)} alt={article.title} className={"styleImgSide"}/>
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
                        <img className={"w33"} src={extractFirstImageLink("<div></div>")} alt={article.title} id="styleImgBubble"/>
                        <div className={"w66"}>
                            <p className={"w100"}>
                                {article.author}
                                <br/>
                                {formaterDateEnFrancaisAvecJour(article.publishDate)}
                            </p>
                        </div>
                    </div>

                </div>
            </article>
        );
    } else {
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
                        <img className={"w33"} src={extractFirstImageLink("<div></div>")} alt={article.title} id="styleImgBubble"/>
                        <div className={"w66"}>
                            <p className={"w100"}>
                                {article.author}
                                <br/>
                                {formaterDateEnFrancaisAvecJour(article.publishDate)}
                            </p>
                        </div>
                    </div>

                </div>
            </article>
        );
    }

}

export default ArticleCardHorizontal;
