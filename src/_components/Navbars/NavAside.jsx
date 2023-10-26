import Button from "../Buttons/Button";
import ClickableImg from "../ClickableImg/ClickableImg";

const NavAside = () => {

    const styleAside = {
        position: "fixed",
        height: "inherit",
        width: "15%",

        margin: "none",
        padding: "1rem ",

        background: "var(--lightGrey)",
        borderRight: "solid 1px #000"
    }

    const styleDivTop = { alignSelf: "flex-start" }
    const styleDivTopImg = { margin: "1rem 0rem 3rem 0rem" }
    const styleDivBottom = { alignSelf: "flex-end" }

    return (
        <aside className={"line"} style={styleAside}>

            <div className={"line w100"} style={styleDivTop}>

                <div style={styleDivTopImg}>
                    <ClickableImg src={"_images/Inssat.png"} href={"/"} title={"Home"}/>
                </div>

                <Button className={"buttonLightGrey w100"} href={"/"} content={"Dashboard"}/>
                <Button className={"buttonLightGrey w100"} href={"/test"} content={"Schedule"}/>
                <Button className={"buttonLightGrey w100"} content={"Marks"}/>
                <Button className={"buttonLightGrey w100"} content={"Courses"}/>
                <Button className={"buttonLightGrey w100"} content={"Messaging"}/>
                <Button className={"buttonLightGrey w100"} content={"Contact"}/>
                <Button className={"buttonLightGrey w100"} content={"News"}/>
            </div>

            <div className={"line w100"} style={styleDivBottom}>
                <Button className={"buttonLightGrey w100"} content={"My profile"}/>
                <Button className={"buttonLightGrey w100"} content={"Settings"}/>
                <Button className={"buttonLightGrey w100"} content={"Log out"}/>
            </div>

        </aside>
    )
}

export default NavAside
