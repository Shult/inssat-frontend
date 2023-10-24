import React from "react";
import {Route, Routes} from "react-router-dom";
import HomeStudent from "../HomeStudent";
import Test from "../test/Test";
import HomeStudentV2 from "../HomeStudentV2";

const Router = () => {
    return(
        <Routes>
            <Route path="/homeStudent" Component={HomeStudent}/>
            <Route path="/homeStudentv2" Component={HomeStudentV2}/>
            <Route path="/test" Component={Test}/>
        </Routes>
    )
}

export default Router
