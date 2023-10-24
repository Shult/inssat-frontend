import React from 'react'
import Calendar from "./_components/Calendar/Calendar";
import ArticlesCarouselV2 from "./_components/ArticlesCarouselV2/ArticlesCarouselV2";

const HomeStudentV2 = () => {
    return(
        <div className="">
            <h4 className="">Home Student</h4>
            <p>Under Construction...</p>
            <div className={""}>
                <div className={"row"}>
                    <div className={"col-8"}>
                        <Calendar/>
                    </div>
                    <div className={"col-4"}>
                        <ArticlesCarouselV2/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomeStudentV2
