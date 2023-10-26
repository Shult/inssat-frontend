import {useState} from "react";

const ClickableImg = ({href="#", src="_images/robot-icon.png", title="img", alt="img", width="fit-content"}) => {

    const [isHover, setHover] = useState()

    const styleLink = {
        display: "flex",
        justifyContent: "space-around",
        width: width
    }

    const styleImg= {
        margin: "0.5rem",
        alignSelf: "center",
        width: "100%",
        boxShadow: isHover ? "solid 3px var(--gold)" : "none"
    }

    return (
        <a style={styleLink}
           href={href}
           onMouseEnter={() => setHover(true)}
           onMouseLeave={() => setHover(false)}
        >
            <img style={styleImg} src={src} title={title} alt={alt}/>
        </a>
    )
}

export default ClickableImg
