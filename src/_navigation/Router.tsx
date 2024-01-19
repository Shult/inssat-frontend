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
import ApprenticeshipManagement from "../_pages/ApprenticeshipManagement/ApprenticeshipManagement";
import ActivityReport from "../_pages/ActivityReport/ActivityReport"
import ActivityReportView from "../_pages/ActivityReport/ActivityReportView/ActivityReportView"
import ApprenticeshipTickets from "../_pages/ApprenticeshipTickets/ApprenticeshipTickets";
import _404 from "../_pages/404";

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
            { (roleManager.isApprenticeshipManager) ?
                <Route path="/" Component={ ApprenticeshipManagement }/> : <Route path="/apprenticeshipManagement" Component={ ApprenticeshipManagement }/>
            }
            <Route path="/blogEditor" Component={Blog}/>

            <Route path="/activityReport/" Component={ActivityReport} />
            <Route path="/activityReportView/" Component={ActivityReportView} />

            <Route path="/newPostEditor" Component={ArticleCreation}/>
            <Route path="/category/:name/:id" Component={Article.ByCategory}/>
            <Route path="/article/:id" Component={Article.Details}/>
            <Route path="/article/:id/edit" Component={Article.Edit}/>
            <Route path="/article/new" Component={Article.New}/>

            <Route path="/apprenticeshipTickets" Component={ApprenticeshipTickets}/>

            <Route path="/category/:name" Component={Category.Details} />

            <Route path="/myaccount" Component={MyAccount}/>
            <Route path="/news" Component={News}/>

            {/* PageNotFound */}
            <Route path="/page-not-found" Component={_404}/>
            <Route path="*" Component={PageNotFound}/>

        </Routes>
    )
}
export default Router
