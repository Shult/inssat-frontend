import React,{ useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {NavLink} from "react-router-dom";
import './Navbar.css'

import NavItem from "./NavLink/NavItem";

const NavbarS = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);
    return(
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <NavLink className="navbar-brand" to="homeStudent">INSSAT</NavLink>
                <button className="navbar-toggler" type="button" onClick={toggle}>
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`}>
                    <ul className="navbar-nav ml-auto">
                        <NavItem link={"notes"} linkName={"Notes"}/>
                        <NavItem link={"timetable"} linkName={"Timetable"}/>
                        <NavItem link={"courses"} linkName={"Courses"}/>
                        <NavItem link={"messages"} linkName={"Messages"}/>
                        <NavItem link={"contacts"} linkName={"Contacts"}/>
                        <NavItem link={"homeStudentv2"} linkName={"Home student dashboard"}/>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default NavbarS