import React from 'react'
import ArticleEnssatComponents from "../../_components/ArticlesEnssat/ArticleEnssatComponents";
import "./News.css"
import ArticleAllComponent from "../../_components/ArticleAll/ArticleAllComponent";

const News = () => {
    return(
        <div className="container" id={"NewsContainer"}>
            {/*<ArticleEnssatComponents/>*/}
            <ArticleAllComponent/>
        </div>
    )
}

export default News
