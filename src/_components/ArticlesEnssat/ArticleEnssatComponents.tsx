import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchArticles } from "./articleEnssatReducer";
import { RootState} from "../../_store/store";


const ArticlesComponent = () => {
    const dispatch = useDispatch();
    const articles = useSelector((state: RootState) => state.articlesEnssat.articles);
    const status = useSelector((state: RootState) => state.articlesEnssat.status);

    useEffect(() => {
        if (status === 'idle') {
            console.log("Dispatching fetch request");
            dispatch(fetchArticles());
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
    }, [status, dispatch]);

    console.log("Articles :", articles);

    return (
        <div>
            {articles.map((article, index) => (
                <div key={index}>
                    <p>{article.title?._text}</p>
                    <p>{article.published?._text}</p>
                    <p>{article.link[2]?._attributes?.href}</p>
                    {/*<p>{article.content._text}</p>*/}
                    <p>{article.author?.name?._text}</p>
                    {article.category?.map((category) => (
                        <li>{category._attributes?.term}</li>
                    ))}
                </div>
            ))}
            <p>Hello test</p>
        </div>
    );

}

export default ArticlesComponent;
