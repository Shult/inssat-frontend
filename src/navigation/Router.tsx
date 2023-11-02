import React from "react";
import {Route, Routes} from "react-router-dom";
import HomeStudent from "../_pages/HomeStudent/HomeStudent";

const Router = () => {
    return(
        <Routes>
            <Route path="/homeStudent" Component={HomeStudent}/>
        </Routes>
    )
}

export default Router