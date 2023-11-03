import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchArticles } from "./articleEnssatReducer";
import { RootState} from "../../_store/store";
import "./articleEnssatComponents.css"
import "../ArticlesCarouselDashboard/ArticlesCarouselDashboard.css"
import ArticleCardEnssat2 from "../ArticleCardEnssat/ArticleCardEnssat.vs2";

const ArticlesComponent = () => {
    const dispatch = useDispatch();
    const articles = useSelector((state: RootState) => state.articlesEnssat.articles);
    const status = useSelector((state: RootState) => state.articlesEnssat.status);
    let useEffectBool = false;

    useEffect(() => {
        if (status === 'idle' && !useEffectBool) {
            console.log("Dispatching fetch request");
            dispatch(fetchArticles());
            useEffectBool = true;
        }
        else if(status === 'failed'){
            console.log("Request failed");
        }
        else if(status === 'loading'){
            console.log("Request loading");
        }
        else if(status === 'succeeded'){
            console.log("Request succeeded");
        }
    }, []);

    const [currentPage, setCurrentPage] = React.useState(1);
    const ARTICLES_PER_PAGE = 3;
    const startIndex = (currentPage - 1) * ARTICLES_PER_PAGE;
    const endIndex = startIndex + ARTICLES_PER_PAGE;
    const currentArticles = articles.slice(startIndex, endIndex);


    console.log(articles);
    if(status==="succeeded"){
        return (
            <div className={"container containerArticleList"}>
                <div className={"pagination-bar"}>
                    {Array(Math.ceil(articles.length / ARTICLES_PER_PAGE)).fill(null).map((_, idx) => (
                        <button onClick={() => setCurrentPage(idx + 1)} className={"pagination-button"}>
                            {idx + 1}
                        </button>
                    ))}
                </div>
                {currentArticles.map((item, index) => (
                    <div className={"col"}>
                        <ArticleCardEnssat2 item={item} index={index}/>
                    </div>
                ))}


            </div>
        );
    } else {
        return(
                <div>
                    Waiting ...
                </div>
            )
    }
}

export default ArticlesComponent;
