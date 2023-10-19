import React, {useState} from "react";

const Input = ({inputName = "input", inputPlaceholder = "Write something here..."}) => {

    const [isHover = false, setIsHover] = useState(false);

    const handleMouseEnter = () => {
        setIsHover(true);
    };
    const handleMouseLeave = () => {
        setIsHover(false);
    };

    const style = {
        border: isHover? "var(--blue)" : "var(--grey)",
        padding: "0.5rem",
        borderRadius: "1rem",
    }

    return(
        <input style={style}
               name={inputName}
               placeholder={inputPlaceholder}
               onMouseEnter={handleMouseEnter}
               onMouseLeave={handleMouseLeave}
        />
    )
}

export default Input;
