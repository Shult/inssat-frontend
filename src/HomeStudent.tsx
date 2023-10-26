import React from 'react'
import Calendar from "./_components/Calendar/Calendar";
import ArticlesCarousel from "./_components/ArticlesCarousel/ArticlesCarousel";

const HomeStudent = () => {
    return(
        <div className={"line w100"}>

            <h4 className={"w100"}>Home Student</h4>

            <section className={"w66"}>
                <Calendar/>
            </section>

            <section className={"w33"}>
                <ArticlesCarousel/>
            </section>

        </div>
    )
}

export default HomeStudent
