import React from "react";
import Link from "../Clickable/Link";
import ClickableImg from "../ClickableImg/ClickableImg";

const Navbar = () => {

    const styleNav = {
        background: "var(--gold)",
        borderRadius: "0.5rem",
        boxShadow: "0 0 5px var(--grey)"
    }

    return(
        <div className={"line w100"}>
            <nav className={"line w75"} style={styleNav}>
                <Link className={"linkWhite goldenBackground"} name={"Home"} href={"/homeStudent"} content={"Home"}/>
                <Link className={"linkWhite goldenBackground"} name={"Test"} href={"/test"} content={"Test"}/>
                <Link className={"linkWhite goldenBackground"} name={"Mail"} href={"/mail"} content={"Mail"}/>
                <Link className={"linkWhite goldenBackground"} name={"Marks"} href={"/marks"} content={"Marks"}/>
                <ClickableImg/>
            </nav>
        </div>
    )
}

export default Navbar;
