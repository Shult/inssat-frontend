import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchArticles } from "./articleEnssatReducer";
import { RootState} from "../../_store/store";
import "./articleEnssatComponents.css"

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
            <div>
                {articles.map((item, index)=>(
                    <div key={index} className={"article-enssat-card"}>
                        <p>{item.title._text}</p>
                        <p>{item.author.name._text}</p>
                        <a href={item.link[2]._attributes.href}><p>En savoir plus</p></a>
                        <p>{item.published._text}</p>
                        {item.category.map((cat, index) => (
                            <li key={index}>{cat._attributes.term}</li>
                        ))}
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

// title: entry.title,
//     pubDate: entry.published,
//     link: entry.link[2]._attributes.href,
//     content: entry.content,
//     author: entry.author,
//     categories: entry.category.map((item: CategoryType) => item._attributes.term),
