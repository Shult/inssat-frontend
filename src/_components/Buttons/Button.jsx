import React from "react";
import "./style.css"

const Button = ({className = "buttonWhite", name = "I'm a btn", href= "#", content= "Click me"}) => {
    return(
        <a className={className}
           name={name}
           href={href}
        >{content}</a>
    )
}

export default Button
