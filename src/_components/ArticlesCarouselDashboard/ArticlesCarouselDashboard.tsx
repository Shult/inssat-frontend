import React, {useEffect} from 'react';
import './ArticlesCarouselDashboard.css';
import {useDispatch, useSelector} from "react-redux";
import {Article} from "../../_interfaces/interfacesArticles"
import {getArticles} from "../../_actions/articleActions";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ArticleCarouselV2 = () => {
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
        <div className={"container article-dashboard-list"}>
            {/*<div className={"article-dashboard-big-title"}>*/}
            {/*    <h1>THE NEWS</h1>*/}
            {/*</div>*/}
            <Slider {...settings}>
                {articles.map(article => (
                    <div onClick={() => redirectToSite(article.link)} className={"row"}>
                        <div className={"article-dashboard-card"}>
                            <div className={"row"}>
                                <div className={"col article-dashboard-div-img"} style={{ padding: '0' }}>
                                    <img className="article-dashboard-img" src={loadImage(article.imageUrl)} alt={article.title}/>
                                </div>
                                <div className={"col article-dashboard-text"}>
                                        <h2 className={"article-dashboard-text"}>{article.title}</h2>
                                        <p className={"article-dashboard-text"}>{article.snippet}</p>
                                    {article.tags.map(tag =>(
                                        <a className="btn btn-outline-secondary article-dashboard-tag">#{tag}</a>
                                    ))}
                                    <div className={"row-4"}>
                                        <div className={"user-profile-container"}>
                                            <img className={"article-dashboard-user-img"} src={loadImage(article.imageUrl)} alt={article.title}/>
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
                ))}
            </Slider>
        </div>
    );
}

export default ArticleCarouselV2;
