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

function redirectToSite(Link : string) : void {
    window.location.href = Link;
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

function ArticleCardEnssat(props : any) {
    const { item, index } = props;

    return (
        <div onClick={() => redirectToSite(item.link[2]._attributes.href)} className={"article-enssat-card row"}>

            <div key={index} className={"w33"}>
                <img src={ extractFirstImageLink(item.content._text) } alt="Extracted from HTML" className={"styleImgSide"} />
            </div>

            <div className={"w66"}>
                <h2 className={"w100"}>{ item.title._text }</h2>
                
                <div>
                    <img className={"article-enssat-user-img"} src={loadImage("_user/Unknown.png")} alt={item.title._text} />
                    {item.author.name._text} {item.published._text}
                </div>

                <div className={"line w100 space-around"}>
                    {item.category.map((tag : any) => (
                        <Link key={tag._attributes.term} className={"buttonWhite"} content={tag._attributes.term}/>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ArticleCardEnssat;
