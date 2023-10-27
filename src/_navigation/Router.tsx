import React from "react";
import {Route, Routes} from "react-router-dom";
import HomeStudent from "../HomeStudent";
import Test from "../test/Test";
import PageNotFound from "../_components/PageNotFound";
const Router = () => {
    return(
        <Routes>
            <Route path="/" Component={HomeStudent}/>
            <Route path="/test" Component={Test}/>
            <Route path="*" Component={PageNotFound} />
        </Routes>
    )
}

export default Router
