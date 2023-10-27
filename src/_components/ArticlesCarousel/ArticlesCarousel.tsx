import React, {useEffect} from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './ArticlesCarousel.css';
import {useDispatch, useSelector} from "react-redux";
import {Article} from "../../_interfaces/interfacesArticles"
import {getArticles} from "../../_actions/articleActions"; // Style for the carousel

const ArticleCarousel = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getArticles());
    }, [dispatch]);

    const articles = useSelector((state: any) => state.articles.articles) as Article[];

    const settings = {
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 3,
        vertical: true,
        verticalSwiping: true,
        arrows: false
    };

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

    return (
        <div>
        <div className={"article-big-title"}>
            <h1>THE NEWS</h1>
        </div>
            <Slider {...settings}>
                {articles.map(article => (
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
                                    {article.tags.map(tag =>(
                                        <a className="btn btn-outline-secondary article-tag">#{tag}</a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    );
}

export default ArticleCarousel;
