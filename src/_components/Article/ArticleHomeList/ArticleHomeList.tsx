import React, {useEffect} from 'react';
import {ArticleDetails} from "../Services/interfacesArticles"
import {RootState} from "../../../_store/store";

// Style
import './articleHomeList.css';

import {useDispatch, useSelector} from "react-redux";   // Interact with redux
import {getArticlesREALAPI} from "../Services/articleActions";  // For Inssat article
import {fetchArticles} from "../ArticlesEnssat/articleEnssatReducer";    // For Enssat article

// Components
import ArticleCard from "../ArticleCard/ArticleCard";
import {
    ArticleEnssatToArticleDetails,
    ArticleInssatToArticleDetails,
    SortArticleByDate
} from "../Services/articleServices";

const ArticleHomeList = () => {

    const dispatch = useDispatch();

    const articlesInssat = useSelector((state: any) => state.articles.articles) as ArticleDetails[];
    const articlesEnssat = useSelector((state: RootState) => state.articlesEnssat.articles);
    const status = useSelector((state: RootState) => state.articlesEnssat.status);

    let useEffectBool = false;
    let allArticles : ArticleDetails[] = []

    useEffect(() => {
        if (status === 'idle' && !useEffectBool) {
            dispatch(fetchArticles());
            dispatch(getArticlesREALAPI())
            useEffectBool = true;
        }
    }, []);

    ArticleEnssatToArticleDetails(articlesEnssat, allArticles);
    ArticleInssatToArticleDetails(articlesInssat, allArticles);
    SortArticleByDate(allArticles);

    if(status==="succeeded"){
        return (
            <div className={"articleCarouselList"}>
                {allArticles.map((article, index) => (
                    <ArticleCard article={article} key={index}/>
                ))}
            </div>
        );
    } else {
        return(
            <div>
                Loading ...
            </div>
        )
    }
}

export default ArticleHomeList;
