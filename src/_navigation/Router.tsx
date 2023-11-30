import React from "react";
import {Route, Routes} from "react-router-dom";
import PageNotFound from "../_components/PageNotFound";
import Blog from "../_pages/Blog/Blog";
import ArticleCreation from "../_components/Article/ArticleCreation/ArticleCreation";
import News from "../_pages/News/News";
import Article from "../_pages/Article/index";
import Category from "../_pages/Category/index";
import Schedule from "../_pages/Schedule";
import MyAccount from "../_pages/MyAccount/MyAccount";
import HomeExternal from "../_pages/HomeExternal/HomeExternal";
import {RoleManager} from "./RoleManager";
import Home from "../_pages/Home";

const Router = () => {
    const roleManager = RoleManager()

    return(
        <Routes>
            { (roleManager.isStudent || roleManager.isTeacher) ?
                <>
                    <Route path="/" Component={Home}/>
                    <Route path="/schedule" Component={Schedule}/>
                </> : <></>
            }
            { (roleManager.isExternal) ?
                <Route path="/" Component={ HomeExternal }/> : <></>
            }
            { (roleManager.isNewsManager) ?
                <Route path="/" Component={ News }/> : <Route path="/news" Component={ News }/>
            }
            <Route path="/blogEditor" Component={Blog}/>
            <Route path="/myaccount" Component={MyAccount}/>
            <Route path="/newPostEditor" Component={ArticleCreation}/>
            <Route path="/article/:id" Component={Article.Details}/>
            <Route path="/article/new" Component={Article.New}/>
            <Route path="/category/:name" Component={Category.Details} />

            {/* PageNotFound */}
            <Route path="*" Component={PageNotFound}/>

        </Routes>
    )
}
export default Router
