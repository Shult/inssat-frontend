import React from 'react'
import Calendar from "../../_components/Calendar/Calendar";
import ArticleCarouselVertical from "../../_components/ArticlesCarouselHorizontal/ArticlesCarouselHorizontal";
import Button from "../../_components/Clickable/Button";
import "./HomeStudent.css"

const HomeStudent = () => {
    return(
        <>
            <section className={"line w100 space-between"} id={"LastArticle-Section"}>

                <article className={"line w66 items-center space-around"} id={"LastArticle-Article"}>
                    <h4 className={"w100 self-start"}>Section pour le dernier article paru</h4>
                    <p className={"w100"}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                        laboris nisi ut aliquip ex ea commodo consequat.
                    </p>
                </article>

                <article className={"line w33 items-center"} >
                    <div className={"line w100"} id={"LastArticle-Tags"}>
                        <h4 className={"w100"}>Catégories</h4>
                        <Button className={"buttonGold w66"} content={"#tag"}/>
                        <Button className={"buttonGold w66"} content={"#tag"}/>
                        <Button className={"buttonGold w66"} content={"#tag"}/>
                    </div>
                </article>

            </section>

            <section className={"line w100"} id={"SecondLine"}>

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
