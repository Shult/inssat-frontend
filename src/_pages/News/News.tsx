import React from 'react'
import ArticleEnssatComponents from "../../_components/ArticlesEnssat/ArticleEnssatComponents";
import "./News.css"
import ArticleAllComponent from "../../_components/ArticleAll/ArticleAllComponent";
import ArticleAllComponent2 from "../../_components/ArticleAll/ArticleAllComponentAPIBack";

const News = () => {
    return(
        <div className="container" id={"NewsContainer"}>
            {/*<ArticleEnssatComponents/>*/}
            {/*<ArticleAllComponent/>*/}
            <ArticleAllComponent2/>
        </div>
    )
}

export default News
