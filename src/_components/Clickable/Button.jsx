import React from "react";
import "./style.css"

const Button = ({className = "buttonWhite", name = "I'm a btn", content= "Click me", onclick= function (){}}) => {
    return(
        <a className={className}
           name={name}
           onClick={onclick}
        >{content}</a>
    )
}

export default Button
