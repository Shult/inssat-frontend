import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchArticles } from "./articleEnssatReducer";
import { RootState} from "../../_store/store";
import "./articleEnssatComponents.css"
import ArticleCardEnssat from "../ArticleCardEnssat/ArticleCardEnssat";

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


    console.log(articles);
    if(status==="succeeded"){
        return (
            <div className={"container"}>
                {articles.map((item, index)=>(
                    <div className={"col"}>
                        <ArticleCardEnssat item={item} index={index}/>
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
