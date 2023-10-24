import React, {useEffect} from 'react';
import './ArticlesCarouselV2.css';
import {useDispatch, useSelector} from "react-redux";
import {Article} from "../../_interfaces";
import {getArticles} from "../../_actions/articleActions"; // Style for the carousel

const ArticleCarouselV2 = ({ }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getArticles());
    }, [dispatch]);

    const articles = useSelector((state: any) => state.articles.articles) as Article[];

    // Used to load the image, because I faced an issue when I past directly the images
    function loadImage(imagePath: string) {
        try {
            return require(`../../../public/_assets/_imgArticles/${imagePath}`);
        } catch (err) {
            return '';
        }
    }

    return (
        <div className={"container article-list"}>
            <div className={"article-big-title"}>
                <h1>THE NEWS</h1>
            </div>
                {articles.map(article => (
                    <div className={"row"}>
                        <div className={"article-card"}>
                            <div className={"row"}>
                                <div className={"col article-div-img"}>
                                    <img className="article-img" src={loadImage(article.imageUrl)} alt={article.title}/>
                                </div>
                                <div className={"col article-text"}>
                                    <h2 className={"article-text"}>{article.title}</h2>
                                    <p className={"article-text"}>{article.snippet}</p>
                                    {article.tags.map(tag =>(
                                        <a href={article.link} className="btn btn-outline-secondary article-tag">#{tag}</a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
        </div>
    );
}

export default ArticleCarouselV2;
