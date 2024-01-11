import React, { useState } from 'react';
import "../../../ToolBox/styles.css"

function Activity(props : any) {
    const { activity } = props;

    const [title, setTitle] = useState('Évaluer la compétence');
    const handleSelect = (eventKey : any) => {
        setTitle(eventKey);
    };

    return(
        <p className={"paragraph-std"}>{ activity }</p>
    )
}

export default Activity;