import React from "react";
import {Route, Routes} from "react-router-dom";
import Test from "../_pages/Test/Test";
import PageNotFound from "../_components/PageNotFound";
import Blog from "../_pages/Blog/Blog";
import ArticleCreation from "../_components/Article/ArticleCreation/ArticleCreation";
import News from "../_pages/News/News";
import HomeStudent from "../_pages/HomeStudent/HomeStudent";
import MyAccount from "../_pages/MyAccount/MyAccount";
import HomeExternal from "../_pages/HomeExternal/HomeExternal";
import {RoleManager} from "./RoleManager";

const Router = () => {
    const roleManager = RoleManager()

    return(
        <Routes>
            { (roleManager.isStudent || roleManager.isTeacher) ? <Route path="/" Component={ HomeStudent }/> : <></>}
            { (roleManager.isExternal) ? <Route path="/" Component={ HomeExternal }/> : <></>}
            { (roleManager.isNewsManager) ? <Route path="/" Component={ News }/> : <></>}
            <Route path="/test" Component={Test}/>
            { (roleManager.isNewsManager) ? <></> : <Route path="/news" Component={News}/> }
            <Route path="/blogEditor" Component={Blog}/>
            <Route path="/myaccount" Component={MyAccount}/>
            <Route path="/newPostEditor" Component={ArticleCreation}/>
            <Route path="*" Component={PageNotFound} />
        </Routes>
    )
}
export default Router
