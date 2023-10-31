import React from 'react'
import Calendar from "../../_components/Calendar/Calendar";
import ArticleCarouselV2 from "../../_components/ArticlesCarouselDashboard/ArticlesCarouselDashboard";

const HomeStudent = () => {
    return(
        <div className={"line w100"}>

            <h4 className={"w100"}>Home Student</h4>

            <section className={"w66"}>
                <Calendar/>
            </section>

            <section className={"w33"}>
                <ArticleCarouselV2/>
            </section>
        </div>
    )
}

export default HomeStudent
