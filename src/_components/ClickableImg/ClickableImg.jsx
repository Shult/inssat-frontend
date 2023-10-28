const ClickableImg = ({href="#", src="_images/robot-icon.png", title="img", alt="img", className="w100"}) => {

    return (
        <a href={href} className={className}>
            <img className={"w100"} src={src} title={title} alt={alt}/>
        </a>
    )
}

export default ClickableImg
