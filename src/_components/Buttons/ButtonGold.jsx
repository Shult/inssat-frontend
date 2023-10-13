import React, {useState} from "react";

const ButtonGold = ({btnName = "I'm a btn", btnHref= "#", btnContent= "Click me"}) => {

    const [isHover = false, setIsHover] = useState(false);

    const handleMouseEnter = () => {
        setIsHover(true);
    };
    const handleMouseLeave = () => {
        setIsHover(false);
    };

    const style = {
        background: isHover? "var(--gold)" : "#fff",
        color: isHover? "#fff" : "var(--gold)",
        textDecoration: isHover? "underline" : "none",

        padding: "0.5rem 0.75rem",
        borderRadius: "2rem",
        border: "solid 1px var(--gold)",
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

export default ButtonGold
