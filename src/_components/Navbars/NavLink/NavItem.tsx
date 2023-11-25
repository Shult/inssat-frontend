import React from "react";
import {NavLink} from "react-router-dom";

interface NavItemProps {
    link: string;
    linkName: string;
}

const NavItem: React.FC<NavItemProps> = (props) => {
    return(
            <li className="nav-item">
                <NavLink to={props.link} className="nav-link">{props.linkName}</NavLink>
            </li>
        )
}

export default NavItem