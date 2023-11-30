import React from 'react'

// Style
import "./HomeStudent.css"

// Components
import CalendarToDay  from "../../_components/Calendar/CalendarCustom";
import ArticleCardLastNews from "../../_components/Article/ArticleCardLastNews/ArticleCardLastNews";
import ArticleHomeList from "../../_components/Article/ArticleHomeList/ArticleHomeList";

const HomeStudent = () => {
    return(
        <>
            <section className={"line w100 space-between"} id={"HomeStudent-FirstLine"}>
                <ArticleCardLastNews/>
            </section>

            <section className={"line w100 space-between"} id={"HomeStudent-SecondLine"}>

                <article className={"w66"}>
                    <CalendarToDay calendarType={"timeGridDay"}/>
                </article>

                <article className={"w33"}>
                    <ArticleHomeList/>
                </article>

            </section>

        </>
    )
}

export default HomeStudent
