const ClickableImg = ({href="#", src="_images/robot-icon.png", title="img", alt="img", className="w100"}) => {

    return (
        <a href={href}>
            <img className={className} src={src} title={title} alt={alt}/>
        </a>
    )
}

export default ClickableImg
