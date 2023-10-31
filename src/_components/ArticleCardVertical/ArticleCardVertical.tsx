import React from 'react';
import "./ArticleCardVertical.css"


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

function ArticleCardVertical(props : any) {
    const { article } = props;

    return (
        <div onClick={() => redirectToSite(article.link)} className={"container"}>
            <div className={"article-card"}>
                <div className={"row"}>
                    <div className={"article-div-img"}>
                        <img className="article-img" src={loadImage(article.imageUrl)} alt={article.title}/>
                    </div>
                </div>
                <div className={"row"}>
                    <div className="article-text">
                        <h2 className={"article-text"}>{article.title}</h2>
                        <p className={"article-text"}>{article.snippet}</p>
                        {article.tags.map((tag : any) =>(
                            <a className="btn btn-outline-secondary article-tag">#{tag}</a>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ArticleCardVertical;
