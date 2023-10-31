import React from 'react';
import "./ArticleCardHorizontal.css"


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

function ArticleCardHorizontal(props : any) {
    const { article } = props;

    return (
        <div onClick={() => redirectToSite(article.link)} className={"row"}>
            <div className={"article-dashboard-card"}>
                <div className={"row"}>
                    <div className={"col article-dashboard-div-img"} style={{ padding: '0' }}>
                        <img className="article-dashboard-img" src={loadImage(article.imageUrl)} alt={article.title} />
                    </div>
                    <div className={"col article-dashboard-text"}>
                        <h2 className={"article-dashboard-text"}>{ article.title }</h2>
                        <p className={"article-dashboard-text"}>{article.snippet}</p>
                        {article.tags.map((tag : any) => (
                            <a key={tag} className="btn btn-outline-secondary article-dashboard-tag">#{tag}</a>
                        ))}
                        <div className={"row-4"}>
                            <div className={"user-profile-container"}>
                                <img className={"article-dashboard-user-img"} src={loadImage(article.imageUrl)} alt={article.title} />
                                <div className={"user-info"}>
                                    <div className={"article-dashboard-user-text"}>
                                        Sylvain MESTRE <b>.</b>{article.publishDate}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ArticleCardHorizontal;
