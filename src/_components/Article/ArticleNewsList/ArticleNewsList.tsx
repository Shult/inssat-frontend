import React, { useEffect } from 'react';
import { RootState} from "../../../_store/store";
import { useDispatch, useSelector } from 'react-redux';
import { fetchArticles } from "../ArticlesEnssat/articleEnssatReducer";

// Style
import "./ArticleNewsList.css"

// Components
import ArticleCard from "../ArticleCard/ArticleCard";

// Services
import {getArticlesREALAPI} from "../Services/articleActions";
import {
    ArticleEnssatToArticleDetails,
    ArticleInssatToArticleDetails,
    SortArticleByDate
} from "../Services/articleServices";
import {ArticleDetails} from "../Services/interfacesArticles";


const ArticleNewsList = () => {
    const dispatch = useDispatch();
    const articlesInssat = useSelector((state: any) => state.articles.articles) as ArticleDetails[];
    const articlesEnssat = useSelector((state: RootState) => state.articlesEnssat.articles);
    const status = useSelector((state: RootState) => state.articlesEnssat.status);
    let useEffectBool = false;
    let allArticles : ArticleDetails[] = []

    useEffect(() => {
        if (status === 'idle' && !useEffectBool) {
            // console.log("Dispatching fetch request");
            dispatch(fetchArticles());
            dispatch(getArticlesREALAPI())
            useEffectBool = true;
        }
        else if(status === 'failed'){
            // console.log("Request failed");
        }
        else if(status === 'loading'){
            // console.log("Request loading");
        }
        else if(status === 'succeeded'){
            // console.log("Request succeeded");
        }
    }, []);

    // console.log("Article INSSAT : " + articlesInssat);
    // console.log("Article INSSAT length = " + articlesInssat.length);

    // console.log("Article ENSSAT : " + articlesEnssat);
    // console.log("Article ENSSAT length = " + articlesEnssat.length);

    ArticleEnssatToArticleDetails(articlesEnssat, allArticles);
    ArticleInssatToArticleDetails(articlesInssat, allArticles);

    // console.log("All article = " + allArticles);
    // console.log("All article length = " + allArticles.length);

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
                    {Array(Math.ceil(allArticles.length / ARTICLES_PER_PAGE)).fill(null).map((_, idx) => (
                        <button key= {idx} onClick={() => setCurrentPage(idx + 1)} className={"pagination-button"}>
                            {idx + 1}
                        </button>
                    ))}
                </div>
                {currentArticles.map((article, index) => (
                    <div key={index}>
                        <ArticleCard article={article} index={index}/>
                    </div>
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

export default ArticleNewsList;
