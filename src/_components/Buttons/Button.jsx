import React from "react";
import "./style.css"

const ButtonGold = ({className = "buttonWhite", btnName = "I'm a btn", btnHref= "#", btnContent= "Click me"}) => {
    return(
        <a className={className}
           name={btnName}
           href={btnHref}
        >{btnContent}</a>
    )
}

export default ButtonGold
