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
                <Button className={"buttonLightGrey w100"} href={"/test"} content={"Emploi du temps"}/>
                <Button className={"buttonLightGrey w100"} href={"/marks"} content={"Notes"}/>
                <Button className={"buttonLightGrey w100"} href={"/courses"} content={"Cours"}/>
                <Button className={"buttonLightGrey w100"} href={"/chat"} content={"Messagerie instantanée"}/>
                <Button className={"buttonLightGrey w100"} href={"/contact"} content={"Contact"}/>
                <Button className={"buttonLightGrey w100"} href={"/news"} content={"Actualités"}/>
                <Button className={"buttonLightGrey w100"} href={"/blogEditor"} content={"Edition des actualités"}/>
            </div>

            <div className={"line w100"} style={styleDivBottom}>
                <Button className={"buttonLightGrey w100"} content={"Mon profile"}/>
                <Button className={"buttonLightGrey w100"} content={"Paramètres"}/>
                <Button className={"buttonLightGrey w100"} content={"Déconnexion"}/>
            </div>

        </aside>
    )
}

export default NavAside
