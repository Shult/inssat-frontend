import React from 'react'
import Calendar from "./_components/Calendar/Calendar";
import ArticlesCarouselV2 from "./_components/ArticlesCarouselDashboard/ArticlesCarouselDashboard";

const HomeStudentDashboard = () => {
    return(
        <div className="">
            <h4 className="">Home Student</h4>
            <p>Under Construction...</p>
            <Calendar/>
            <div className={"container"}>
                <div className={"row"}>
                    <div className={"col"}>
                        <ArticlesCarouselV2/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomeStudentDashboard
