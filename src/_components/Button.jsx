import React from "react";

const Button = ({btnName = "I'm a btn", btnValue= "btn", btnContent= "Click me"}) => {

    const style = {
        background: "var(--gold)",
        color: "#fff",
        padding: "0.25rem",
        borderRadius: "15%"
    }

    return(
        <a style={style} name={btnName} value={btnValue}>{btnContent}</a>
    )
}

export default Button
