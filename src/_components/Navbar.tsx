import React from "react";
import LinkGold from "./Links/LinkGold";

const Navbar = () => {
    return(
        <nav className="">
            <div className="">
                <ul className="">
                    <li><LinkGold linkHref={"/homeStudent"} linkContent={"HomeStudent"}/></li>
                    <li><LinkGold linkHref={"/test"} linkContent={"Test"}/></li>
                </ul>
            </div>
        </nav>
    )
}

export default Navbar
