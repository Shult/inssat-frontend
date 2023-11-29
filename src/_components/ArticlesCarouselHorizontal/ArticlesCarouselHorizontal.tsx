import React, {useEffect} from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './ArticlesCarouselHorizontal.css';
import {useDispatch, useSelector} from "react-redux";
import {Article} from "../articleCRUD/interfacesArticles"
import {getArticles} from "../articleCRUD/articleActions";
import ArticleCardVertical from "../ArticleCardVertical/ArticleCardVertical"; // Style for the carousel

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
        vertical: false,
        verticalSwiping: false,
        arrows: false
    };

    return (
        <div>
            <Slider {...settings}>
                {articles.map(article => (
                    <ArticleCardVertical article = {article}></ArticleCardVertical>
                ))}
            </Slider>
        </div>
    );
}

export default ArticleCarousel;
