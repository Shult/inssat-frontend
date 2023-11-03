import React from 'react';
import "./ArticleCardEnssat.css"
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
    if (imgElement) {
        return imgElement.href;
    }
    return loadImage("_user/Unknown.png");
}


function ArticleCardEnssat2(props : any) {
    const { item, index } = props;

    return (
        <article className={"line space-between items-center"} id="styleArticle">

            <div className={"w33 self-stretch"}>
                <img src={extractFirstImageLink(item.content._text)} alt={item.title._text} className={"styleImgSide"}/>
            </div>

            <div className={"line w66"} id="styleDivContent">

                <h2 className={"w100"}>
                    <Link key={index} content={item.title._text}/>
                </h2>

                <div className={"line w100 items-center"}>
                    <img className={""} src={loadImage("_user/Unknown.png")} alt={item.title._text} id="styleImgBubble"/>
                    <div className={""}>
                        <p className={"w100"}>{item.author.name._text} {item.published._text}</p>
                    </div>
                </div>

                <div className={"line w100 space-around"} id={"styleDivContentTag"}>
                    {item.category.map((tag : any) => (
                        <Link key={tag} className={"buttonWhite"} href={tag._attributes.term} content={tag._attributes.term}/>
                    ))}
                </div>

            </div>
        </article>
    );
}

export default ArticleCardEnssat2;
