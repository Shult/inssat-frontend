import React, {useState} from "react";

const Button = ({btnName = "I'm a btn", btnValue= "btn", btnContent= "Click me"}) => {

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
        border: isHover? "none" : "solid 1px var(--gold)",
        borderRadius: "10%",
        padding: "0.25rem",
    }

    return(
        <a style={style} name={btnName} value={btnValue}>{btnContent}</a>
    )
}

export default Button
