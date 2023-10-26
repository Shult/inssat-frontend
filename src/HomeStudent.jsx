import React from 'react'
import Calendar from "./_components/Calendar/Calendar";
import ArticlesCarousel from "./_components/ArticlesCarousel/ArticlesCarousel";

const HomeStudent = () => {

    const style = {
        width: "85%",
        height: "inherit",

        position: "absolute",
        left: "15%",

        padding: "1rem",
    }

    return(
        <div className={"line"} style={style}>

            <h4 className={"w100"}>Home Student</h4>

            <div className={"w66"}>
                <Calendar/>
            </div>

            <div className={"w33"}>
                <ArticlesCarousel/>
            </div>

        </div>
    )
}

export default HomeStudent