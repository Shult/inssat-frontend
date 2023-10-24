import {useState} from "react";

const ClickableImg = ({href="#", src="_images/robot-icon.png", title="img", alt="img", width="5%"}) => {

    const [isHover, setHover] = useState()

    const styleLink = {
        display: "flex",
        justifyContent: "space-around",
        width: width
    }

    const styleImg= {
        alignSelf: "center",
        width: "100%",
        borderRadius: "100%",
        border: isHover ? "solid 3px #fff" : "none"
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
