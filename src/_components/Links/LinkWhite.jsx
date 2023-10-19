import React, {useState} from "react";

const LinkWhite = ({linkName = "I'm a link", linkHref= "#", linkContent= "I'm a link, click me"}) => {

    const [isHover = false, setIsHover] = useState(false);

    const handleMouseEnter = () => {
        setIsHover(true);
    };
    const handleMouseLeave = () => {
        setIsHover(false);
    };

    const style = {
        color: isHover? "var(--gold)" : "#fff",
        textDecoration: "none",
    }

    return(
        <a style={style}
           name={linkName}
           href={linkHref}
           onMouseEnter={handleMouseEnter}
           onMouseLeave={handleMouseLeave}
        >{linkContent}</a>
    )
}

export default LinkWhite
