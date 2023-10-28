import Button from "../Buttons/Button";
import "./UploadFile.css"

const UploadFile = ({className="", name="newFolder", content="Import", accept=""}) => {
    return (
        <div id={"UploadFileContainer"}>
            <input type={"file"} name={name} accept={accept}/>
            <Button className={"buttonGold"} href={"/upload"} name={name} content={content}/>
       </div>
    )
}

export default UploadFile
