import "../../../ToolBox/styles.css"

function Activity(props : any) {
    const { activity } = props;
    return(
        <p className={"paragraph-std"}>{ activity }</p>
    )
}

export default Activity;