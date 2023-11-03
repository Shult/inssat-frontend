import React from 'react'
import Calendar from "../../_components/Calendar/Calendar";
import ArticleCarouselVertical from "../../_components/ArticlesCarouselHorizontal/ArticlesCarouselHorizontal";
import "./HomeStudent.css"
import ArticleLastNews from "../../_components/ArticleLastNews/ArticleLastNews";

const HomeStudent = () => {
    return(
        <>
            <section className={"line w100 space-between"} id={"HomeStudent-FirstLine"}>
                <ArticleLastNews/>
            </section>

            <section className={"line w100 space-between"} id={"HomeStudent-SecondLine"}>

                <article className={"w66"}>
                    <Calendar/>
                </article>

                <article className={"w33"}>
                    <ArticleCarouselVertical/>
                </article>

            </section>

        </>
    )
}

export default HomeStudent
