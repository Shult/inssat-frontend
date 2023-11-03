import React, {useEffect} from 'react';
import './ArticlesCarouselHorizontal.css';
import {useDispatch, useSelector} from "react-redux";
import {Article} from "../articleCRUD/interfacesArticles"
import {getArticles} from "../articleCRUD/articleActions";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ArticleCardHorizontal from "../ArticleCardHorizontal/ArticleCardHorizontal";

const ArticleCarouselVertical = () => {
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
        arrows: true
    };

    return (
        <div className={"container article-dashboard-list"}>
            <Slider {...settings}>
                {articles.map(article => (
                    <ArticleCardHorizontal article={article}/>
                ))}
            </Slider>
        </div>
    );
}
export default ArticleCarouselVertical;
