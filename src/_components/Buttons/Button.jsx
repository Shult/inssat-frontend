import React from "react";
import "./style.css"

const Button = ({className = "buttonWhite", name = "I'm a btn", href= "#", content= "Click me", onclick=""}) => {
    return(
        <a className={className}
           name={name}
           href={href}
           onClick={onclick}
        >{content}</a>
    )
}

export default Button
