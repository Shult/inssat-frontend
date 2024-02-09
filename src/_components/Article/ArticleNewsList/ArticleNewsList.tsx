import React, {useEffect, useState} from 'react';
import { RootState} from "../../../_store/store";
import { useDispatch, useSelector } from 'react-redux';
import { fetchArticles } from "../ArticlesEnssat/articleEnssatReducer";

// Style
import "./ArticleNewsList.css"

// Components
import ArticleCard from "../ArticleCard/ArticleCard";

// Services
import {getArticlesREALAPI} from "../Services/articleActions";
import {ArticleDetails} from "../Services/interfacesArticles";
import {getArticlesINSSAT} from "../ArticleFetchAll";
import {
    ArticleEnssatToArticleDetails,
    ArticleInssatToArticleDetails,
    SortArticleByDate
} from "../Services/articleServices";


const ArticleNewsList = () => {
    const dispatch = useDispatch();

    const [articlesInssat, setArticlesINSSAT] = useState<ArticleDetails[]>([])

    const articlesEnssat = useSelector((state: RootState) => state.articlesEnssat.articles);
    const status = useSelector((state: RootState) => state.articlesEnssat.status);

    let useEffectBool = false;
    let allArticles : ArticleDetails[] = []

    useEffect(() => {
        getArticlesINSSAT().then(result => setArticlesINSSAT(result))
        if (status === 'idle' && !useEffectBool) {
            dispatch(fetchArticles());
            dispatch(getArticlesREALAPI())
            useEffectBool = true;
        }
    }, []);

    ArticleEnssatToArticleDetails(articlesEnssat, allArticles);
    ArticleInssatToArticleDetails(articlesInssat, allArticles);
    SortArticleByDate(allArticles);

    const [currentPage, setCurrentPage] = React.useState(1);
    const ARTICLES_PER_PAGE = 3;
    const startIndex = (currentPage - 1) * ARTICLES_PER_PAGE;
    const endIndex = startIndex + ARTICLES_PER_PAGE;
    const currentArticles = allArticles.slice(startIndex, endIndex);

    if(status==="succeeded"){
        return (
            <div className={"container articleCarouselList"}>

                <div className={"pagination-bar"}>
                    { Array ( Math.ceil(allArticles.length / ARTICLES_PER_PAGE ))
                        .fill(null)
                        .map(
                            (_, idx) => (
                                <button key= {idx} onClick={() => setCurrentPage(idx + 1)} className={"pagination-button"}>
                                    {idx + 1}
                                </button>
                            )
                        )
                    }
                </div>
                {currentArticles.map((article, index) => (
                    <div key={index}>
                        <ArticleCard article={article} index={index}/>
                    </div>
                ))}

            </div>
        );
    }
    else { return( <div> Loading ... </div> ) }
}

export default ArticleNewsList;
