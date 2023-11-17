import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchArticles } from "../ArticlesEnssat/articleEnssatReducer";
import { RootState} from "../../_store/store";
import "./articleAll.css"
import {ArticleDetails} from "../articleCRUD/interfacesArticles";
import {getArticlesREALAPI} from "../articleCRUD/articleActions";
import ArticleCardHorizontal2 from "../ArticleCardHorizontal/ArticleCardHorizontal2";

const ArticlesAllComponent2 = () => {
    const dispatch = useDispatch();
    const articlesInssat = useSelector((state: any) => state.articles.articles) as ArticleDetails[];
    const articlesEnssat = useSelector((state: RootState) => state.articlesEnssat.articles);
    const status = useSelector((state: RootState) => state.articlesEnssat.status);
    let useEffectBool = false;

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

    // console.log("Article details : " + articlesInssat);
    // console.log("Article from INSSAT size = " + articlesInssat.length);
    // console.log("Article from ENSSAT size = " + articlesEnssat.length);

    let allArticles : ArticleDetails[] = []
    let i = 0;

    // Format the articles from enssat to be the same as the article from inssat
    articlesEnssat.forEach((article, index) => {
        if (article.title && typeof article.title._text === 'string') {
            // Create a new article object and push it into allArticles
            const newArticle : ArticleDetails = {
                id: index,
                title: article.title._text,
                description: article.content._text,
                thumbnail: article.content._text,
                author_id: article.author.name._text,
                published_at: article.published._text,
                article_tags: article.category.map(tag=> (
                        tag._attributes.term
                    )),
                category: {
                    title: "cat0"
                },
                author: {
                    ID: index.toString(),
                    FIRST_NAME: article.author.name._text,
                    LAST_NAME: article.author.name._text
                },
                fromEnssat: true,
                link: article.link[2]._attributes.href
            };
            allArticles.push(newArticle);
        }
    });

    // console.log(articlesInssat)
    // console.log(articlesEnssat)
    while (articlesInssat.length > i){
        allArticles.push(articlesInssat[i]);
        i++;
    }
    // console.log("allArticles = " + allArticles);
    // console.log("allArticles length = " + allArticles.length);

    allArticles.sort((a, b) => {
        const dateA = new Date(a.published_at);
        const dateB = new Date(b.published_at);
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
                        <button key= {idx} onClick={() => setCurrentPage(idx + 1)} className={"pagination-button"}>
                            {idx + 1}
                        </button>
                    ))}
                </div>
                {currentArticles.map((article, index) => (
                    <div key={index}>
                        <ArticleCardHorizontal2 article={article} index={index}/>
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

export default ArticlesAllComponent2;
