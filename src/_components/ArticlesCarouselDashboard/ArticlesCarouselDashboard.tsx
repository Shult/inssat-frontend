import React, {useEffect} from 'react';
import './ArticlesCarouselDashboard.css';
import {useDispatch, useSelector} from "react-redux";
import {Article} from "../../_interfaces/interfacesArticles"
import {getArticles} from "../../_actions/articleActions";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ArticleCardHori from "../ArticleCardHori/ArticleCardHori";

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

    return (
        <div className={"container article-dashboard-list"}>
            <Slider {...settings}>
                {articles.map(article => (
                    <ArticleCardHori article={article}/>
                ))}
            </Slider>
        </div>
    );
}

export default ArticleCarouselV2;
