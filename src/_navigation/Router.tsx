import React from "react";
import {Route, Routes} from "react-router-dom";
import Test from "../_pages/Test/Test";
import PageNotFound from "../_components/PageNotFound";
import Blog from "../_pages/Blog/Blog";
import ArticleCreation from "../_components/Article/ArticleCreation/ArticleCreation";
import News from "../_pages/News/News";
import HomeStudent from "../_pages/HomeStudent/HomeStudent";
import MyAccount from "../_pages/MyAccount/MyAccount";
import HomeAdmin from "../_pages/HomeAdmin/HomeAdmin";
import HomeExternal from "../_pages/HomeExternal/HomeExternal";
import {GroupManager} from "./GroupManager";

const Router = () => {
    const groupeManager = GroupManager()

    return(
        <Routes>
            { (groupeManager.isStudent || groupeManager.isTeacher) ? <Route path="/" Component={ HomeStudent }/> : <></>}
            { (groupeManager.isExternal) ? <Route path="/" Component={ HomeExternal }/> : <></>}
            { (groupeManager.isStaff) ? <Route path="/" Component={ HomeAdmin }/> : <></>}
            <Route path="/test" Component={ Test }/>
            <Route path="/news" Component={News}/>
            <Route path="/blogEditor" Component={Blog}/>
            <Route path="/myaccount" Component={MyAccount}/>
            <Route path="/newPostEditor" Component={ArticleCreation}/>
            <Route path="*" Component={PageNotFound} />
        </Routes>
    )
}
export default Router
