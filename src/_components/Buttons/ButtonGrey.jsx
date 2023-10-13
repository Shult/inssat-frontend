import React, {useState} from "react";

const ButtonGrey = ({btnName = "I'm a btn", btnHref= "#", btnContent= "Click me"}) => {

    const [isHover = false, setIsHover] = useState(false);

    const handleMouseEnter = () => {
        setIsHover(true);
    };
    const handleMouseLeave = () => {
        setIsHover(false);
    };

    const style = {
        background: isHover? "var(--grey)" : "#fff",
        color: isHover? "#fff" : "var(--grey)",
        textDecoration: isHover? "underline" : "none",

        padding: "0.5rem 0.75rem",
        borderRadius: "2rem",
        border: "solid 1px var(--grey)",
    }

    return(
        <a style={style}
           name={btnName}
           href={btnHref}
           onMouseEnter={handleMouseEnter}
           onMouseLeave={handleMouseLeave}
        >{btnContent}</a>
    )
}

export default ButtonGrey
