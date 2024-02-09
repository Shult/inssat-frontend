import React from 'react'
import "./News.css"
import ArticleNewsList from "../../_components/Article/ArticleNewsList/ArticleNewsList";

const News = () => {
    return(
        <div className="container" id={"NewsContainer"}>
            <ArticleNewsList/>
        </div>
    )
}

export default News
