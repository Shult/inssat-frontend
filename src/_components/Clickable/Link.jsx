import React from "react";
import "./style.css"

const Link = ({className = "linkGold",
                  name = "reusable link",
                  href= "#",
                  content= "I'm a link, click me",
                  target="",
                  onClickFn=()=>{console.log('clicked');}}) => {

    return(
        <a
            className={className}
            name={name}
            href={href}
            target={target}
            onClick={onClickFn}
        >{content}</a>
    )
}

export default Link
