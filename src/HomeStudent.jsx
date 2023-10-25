import React from 'react'
import Calendar from "./_components/Calendar/Calendar";
import ArticlesCarousel from "./_components/ArticlesCarousel/ArticlesCarousel";
<<<<<<< HEAD
import UploadFile from "./_components/UploadFile";
=======
>>>>>>> dbbbbdc (fix/ color)

const HomeStudent = () => {

    const style = {
        background: "var(--mediumGrey)",

        width: "85%",
        height: "inherit",

        position: "absolute",
        left: "15%",

        padding: "1rem",
    }

    return(
        <div className={"line"} style={style}>

            <h4 className={"w100"}>Home Student</h4>

<<<<<<< HEAD
            <div className={"line w66"}>
                <Calendar/>
                <UploadFile accept={"ics"}/>
=======
            <div className={"w66"}>
                <Calendar/>
>>>>>>> dbbbbdc (fix/ color)
            </div>

            <div className={"w33"}>
                <ArticlesCarousel/>
            </div>

        </div>
    )
}

export default HomeStudent
