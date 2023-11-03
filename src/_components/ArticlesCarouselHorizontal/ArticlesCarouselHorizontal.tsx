import React, {useEffect} from 'react';
import './ArticlesCarouselHorizontal.css';
import {useDispatch, useSelector} from "react-redux";
import {Article} from "../articleCRUD/interfacesArticles"
import {getArticles} from "../articleCRUD/articleActions";
import ArticleCardHorizontal from "../ArticleCardHorizontal/ArticleCardHorizontal";

const ArticleCarouselHorizontal = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getArticles());
    }, [dispatch]);

    const articles = useSelector((state: any) => state.articles.articles) as Article[];

    return (
        <div className={"articleCarouselList"}>
            {articles.map(article => (
                <ArticleCardHorizontal article={article}/>
            ))}
        </div>
    );
}

export default ArticleCarouselHorizontal;
