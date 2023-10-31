import React from 'react';
import "./ArticleCardEnssat.css"

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

                <div key={index} className={"col article-enssat-div-img"}>
                    <img className={"article-enssat-img"} src={ extractFirstImageLink(item.content._text) } alt="Extracted from HTML" />
                </div>

                <div className={"col-8"}>
                    <h2 className={""}>{ item.title._text }</h2>
                    <div className={"article-enssat-user-profile"}>
                        <img className={"article-enssat-user-img"} src={loadImage("_user/Unknown.png")} alt={item.title._text} />
                        <div className={"s"}>
                            <div className={""}>
                                {item.author.name._text} <b>.</b>{item.published._text}
                            </div>
                        </div>
                    </div>
                    {item.category.map((tag : any) => (
                        <a key={tag._attributes.term} className="btn btn-outline-secondary article-enssat-tag">#{tag._attributes.term}</a>
                    ))}
                </div>
        </div>
    );
}

export default ArticleCardEnssat;
