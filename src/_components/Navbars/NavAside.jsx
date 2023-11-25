import Link from "../Clickable/Link";
import ClickableImg from "../ClickableImg/ClickableImg";
import UserService from "../../services/UserServices";


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
                    <ClickableImg src={"/_images/Inssat.png"} href={"/"} title={"Home"}/>
                </div>

                <Link className={"buttonLightGrey w100"} href={"/"} content={"Dashboard"}/>
                <Link className={"buttonLightGrey w100"} href={"/test"} content={"Emploi du temps"}/>
                <Link className={"buttonLightGrey w100"} href={"/marks"} content={"Notes"}/>
                <Link className={"buttonLightGrey w100"} href={"/courses"} content={"Cours"}/>
                <Link className={"buttonLightGrey w100"} href={"/chat"} content={"Messagerie instantanée"}/>
                <Link className={"buttonLightGrey w100"} href={"/contact"} content={"Contact"}/>
                <Link className={"buttonLightGrey w100"} href={"/news"} content={"Actualités"}/>
                <Link className={"buttonLightGrey w100"} href={"/blogEditor"} content={"Edition des actualités"}/>
            </div>

            <div className={"line w100"} style={styleDivBottom}>
                <Link className={"buttonLightGrey w100"} content={"Mon profile"} onClickFn={()=>{
                    window.open(UserService.createAccountUrl(), "_blank")
                }}/>
                <Link className={"buttonLightGrey w100"} content={"Paramètres"}/>
                <Link className={"buttonLightGrey w100"} content={"Déconnexion"} onClickFn={()=>{UserService.doLogout({
                    redirectUri: window.location.origin
                })}} />
            </div>

        </aside>
    )
}

export default NavAside
