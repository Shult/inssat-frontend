import Link from "../Clickable/Link";
import ClickableImg from "../ClickableImg/ClickableImg";
import {styleAside, styleDivBottom, styleDivTop, styleDivTopImg} from "./NavAside.style";
import Button from "../Clickable/Button";
import UserServices from "../../services/UserServices";
import {RoleManager} from "../../_navigation/RoleManager";

const NavAside = () => {
    const roleManager = RoleManager()

    return (
        <aside className={"line"} style={styleAside}>

            <div className={"line w100"} style={styleDivTop}>

                <div style={styleDivTopImg}>
                    <ClickableImg src={"_images/Inssat.png"} href={"/"} title={"Home"}/>
                </div>

                <Link className={"buttonLightGrey w100"} href={"/"} content={"Dashboard"}/>
                {
                    (roleManager.isStudent || roleManager.isTeacher) ?
                        <>
                            <Link className={"buttonLightGrey w100"} href={"/marks"} content={"Notes"}/>
                            <Link className={"buttonLightGrey w100"} href={"/courses"} content={"Cours"}/>
                        </>
                        :
                        <></>
                }
                <Link className={"buttonLightGrey w100"} href={"/contact"} content={"Contact"}/>
                <Link className={"buttonLightGrey w100"} href={"/news"} content={"Actualités"}/>
                {
                    (roleManager.isNewsManager) ?
                        <Link className={"buttonLightGrey w100"} href={"/blogEditor"} content={"Edition des actualités"}/>
                        :
                        <></>
                }
            </div>

            <div className={"line w100"} style={styleDivBottom}>
                <Button className={"buttonLightGrey w100"} content={"Mon profil"} onclick={UserServices.manageAccount}/>
                <Button className={"buttonLightGrey w100"} content={"Déconnexion"} onclick={logout}/>
            </div>

        </aside>
    )
}


function logout(){
    window.history.replaceState(null, null, '/')
    return UserServices.doLogout({redirectUri : "http://localhost:3000/"})
}
export default NavAside
