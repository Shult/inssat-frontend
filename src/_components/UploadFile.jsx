import Button from "./Buttons/Button";

const UploadFile = ({className="", name="newFolder", accept=""}) => {
    const style = {
        padding: "1rem",
        width: "100%"
    }

    return (
        <div style={style}>
            <input type={"file"} name={name} accept={accept}/>
            <Button className={"buttonGold"} href={"/get"} name={"Import"} content={"Import"}/>
        </div>
    )
}

export default UploadFile
