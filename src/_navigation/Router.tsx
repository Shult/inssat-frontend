import React from "react";
import {Route, Routes} from "react-router-dom";
import Test from "../_pages/Test/Test";
import PageNotFound from "../_components/PageNotFound";
import Blog from "../_pages/Blog/Blog";
import ArticleCreation from "../_components/ArticleCreation/ArticleCreation";
import News from "../_pages/News/News";
import HomeStudent from "../_pages/HomeStudent/HomeStudent";

const Router = () => {
    return(
        <Routes>
            <Route path="/" Component={HomeStudent}/>
            <Route path="/test" Component={Test}/>
            <Route path="/news" Component={News}/>
            <Route path="/blogEditor" Component={Blog}/>
            <Route path="/newPostEditor" Component={ArticleCreation}/>
            <Route path="*" Component={PageNotFound} />
        </Routes>
    )
}

export default Router
