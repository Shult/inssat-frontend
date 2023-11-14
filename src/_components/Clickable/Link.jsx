import React from "react";
import "./style.css"

const Link = ({className = "linkGold", name = "reusable link", href= "#", content= "I'm a link, click me", target=""}) => {

    return(
        <a
            className={className}
            name={name}
            href={href}
            target={target}
        >{content}</a>
    )
}

export default Link
