import React from "react";
import { BrowserRouter , Route, Routes} from "react-router-dom";
import Test from "../_pages/Test/Test";
import PageNotFound from "../_components/PageNotFound";
import Blog from "../_pages/Blog/Blog";
import CreateArticle from "../_components/articleCRUD/CreateArticle";
import News from "../_pages/News/News";
import HomeStudent from "../_pages/HomeStudent/HomeStudent";
import Article from "../_pages/Article/index";
import Category from "../_pages/Category/index";
import Home from "../_pages/Home";
import Schedule from "../_pages/Schedule";

const Router = () => {
    return( 
            <Routes >
                <Route path="/home" Component={Home}/>
                <Route path="/schedule" Component={Schedule}/>
                <Route path="/" Component={HomeStudent}/>
                <Route path="/test" Component={Test}/>
                <Route path="/news" Component={News}/>
                <Route path="/blogEditor" Component={Blog}/>
                <Route path="/newPostEditor" Component={CreateArticle}/>  
                <Route path="/article/:id" Component={Article.Details}/>
                <Route path="/article/new" Component={Article.New}/>
                <Route path="/category/:name" Component={Category.Details} />

                {/* PageNotFound */}
                <Route path="*" Component={PageNotFound}/>
             
            </Routes> 
    )
}

export default Router
