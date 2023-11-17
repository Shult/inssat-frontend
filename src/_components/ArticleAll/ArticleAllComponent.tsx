import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchArticles } from "../ArticlesEnssat/articleEnssatReducer";
import { RootState} from "../../_store/store";
import "./articleAll.css"
import {Article} from "../articleCRUD/interfacesArticles";
import {getArticles} from "../articleCRUD/articleActions";
import ArticleCardHorizontal from "../ArticleCardHorizontal/ArticleCardHorizontal";

const ArticlesAllComponent = () => {
    const dispatch = useDispatch();
    const articlesInssat = useSelector((state: any) => state.articles.articles) as Article[];
    const articlesEnssat = useSelector((state: RootState) => state.articlesEnssat.articles);
    const status = useSelector((state: RootState) => state.articlesEnssat.status);
    let useEffectBool = false;

    useEffect(() => {
        if (status === 'idle' && !useEffectBool) {
            console.log("Dispatching fetch request");
            dispatch(fetchArticles());
            dispatch(getArticles())
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

    // console.log("Article from INSSAT = " + articlesInssat.length)
    // console.log("Article from ENSSAT = " + articlesEnssat.length)

    let allArticles : Article[] = []
    let i = 0;

    articlesEnssat.forEach((article, index) => {
        if (article.title && typeof article.title._text === 'string') {
            // Create a new article object and push it into allArticles
            const newArticle : Article = {
                id: index.toString(),
                title: article.title._text,
                imageUrl: article.content._text,                                    // CAREFUL NEED TO CHANGE THIS
                snippet: "",                                                        // CAREFUL NEED TO CHANGE THIS
                content: article.content._text,
                link: article.link[2]._attributes.href,
                tags: article.category.map(tag=> (
                    tag._attributes.term
                )),
                publishDate: article.published._text,
                lastUpdate: article.published._text,
                status: "published",                                                // CAREFUL NEED TO CHANGE THIS
                author: article.author.name._text,
                fromEnssat: true
            };
            allArticles.push(newArticle);
        }
    });

    while (articlesInssat.length > i){
        allArticles.push(articlesInssat[i]);
        i++;
    }
    // console.log("allArticles = " + allArticles);
    console.log("allArticles length = " + allArticles.length);

    allArticles.sort((a, b) => {
        const dateA = new Date(a.publishDate);
        const dateB = new Date(b.publishDate);
        return dateB.getTime() - dateA.getTime(); // Sorting from most recent to oldest
    });


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
                        <button onClick={() => setCurrentPage(idx + 1)} className={"pagination-button"}>
                            {idx + 1}
                        </button>
                    ))}
                </div>
                {currentArticles.map((article, index) => (
                    <div>
                        <ArticleCardHorizontal article={article} index={index}/>
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

export default ArticlesAllComponent;
