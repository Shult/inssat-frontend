import React from "react";
import {Route, Routes} from "react-router-dom";
import HomeStudent from "../homeStudent/HomeStudent";
import Test from "../test/Test";

const Router = () => {
    return(
        <Routes>
            <Route path="/homeStudent" Component={HomeStudent}/>
            <Route path="/test" Component={Test}/>
        </Routes>
    )
}

export default Router
