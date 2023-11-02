import React, {useEffect} from 'react';
<<<<<<<< HEAD:src/_components/ArticlesCarouselVertical/ArticlesCarouselVertical.tsx
import {useDispatch, useSelector} from "react-redux";
import {Article} from "../articleCRUD/interfacesArticles"
import {getArticles} from "../articleCRUD/articleActions";
========
import './ArticlesCarouselHorizontal.css';
import {useDispatch, useSelector} from "react-redux";
import {Article} from "../articleCRUD/interfacesArticles"
import {getArticles} from "../articleCRUD/articleActions";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
>>>>>>>> 52beb51 (Feat: Create new article and remove useless file):src/_components/ArticlesCarouselHorizontal/ArticlesCarouselHorizontal.tsx
import ArticleCardHorizontal from "../ArticleCardHorizontal/ArticleCardHorizontal";
import "./ArticlesCarouselVertical.css"

<<<<<<<< HEAD:src/_components/ArticlesCarouselVertical/ArticlesCarouselVertical.tsx
const ArticleCarouselVertical = () => {
========
const ArticleCarouselHorizontal = () => {
>>>>>>>> 52beb51 (Feat: Create new article and remove useless file):src/_components/ArticlesCarouselHorizontal/ArticlesCarouselHorizontal.tsx
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

<<<<<<<< HEAD:src/_components/ArticlesCarouselVertical/ArticlesCarouselVertical.tsx
export default ArticleCarouselVertical;
========
export default ArticleCarouselHorizontal;
>>>>>>>> 52beb51 (Feat: Create new article and remove useless file):src/_components/ArticlesCarouselHorizontal/ArticlesCarouselHorizontal.tsx
