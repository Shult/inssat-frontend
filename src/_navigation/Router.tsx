import React from "react";
import {Route, Routes} from "react-router-dom";
import HomeStudent from "../_pages/HomeStudent/HomeStudent/HomeStudent";
import Test from "../_pages/Test/Test";
import PageNotFound from "../_components/PageNotFound";
import BlogListEditor from "../BlogListEditor/BlogListEditor";
import News from "../_pages/News/News";

const Router = () => {
    return(
        <Routes>
            <Route path="/" Component={HomeStudent}/>
            <Route path="/test" Component={Test}/>
            <Route path="/news" Component={News}/>
            <Route path="/blogEditor" Component={BlogListEditor}/>
            <Route path="*" Component={PageNotFound} />
        </Routes>
    )
}

export default Router
