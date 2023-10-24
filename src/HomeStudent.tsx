import React from 'react'
import Calendar from "./_components/Calendar/Calendar";
import ArticlesCarousel from "./_components/ArticlesCarousel/ArticlesCarousel";

const HomeStudent = () => {
    return(
        <div className="">
            <h4 className="">Home Student</h4>
            <p>Under Construction...</p>
            <div className="container">
                <div className="col-sm-2">
                    {/*Navbar*/}
                </div>
                <div className="col-sm-12">
                    <div className="row">
                        <Calendar/>
                    </div>
                    <div className="row">
                        <ArticlesCarousel/>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default HomeStudent
