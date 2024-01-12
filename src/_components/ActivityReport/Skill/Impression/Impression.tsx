import React, { useState } from 'react';
import { Row, Col, Dropdown, Form } from 'react-bootstrap';
import "../../../ToolBox/styles.css"
import { getButtonColor } from '../../Services/ActivityReportServices';
import Activity from "../Activity/Activity"
import "./impression.css"

function Impression(data : any) {
    const activity = data.activity;
    //const impression = data.impression;

    const [title, setTitle] = useState('Évaluer la compétence');

    const [dropdownBackground, setDropdownBackground] = useState('#889795'); // Ajout de l'état pour la couleur de fond

    const handleSelect = (eventKey : any) => {
        setTitle(eventKey);

        // Mettre à jour la couleur de fond en fonction de la sélection
        switch (eventKey) {
            case 'Excellent':
                setDropdownBackground('#4caf50');
                break;
            case 'Très bien':
                setDropdownBackground('#90ee90');
                break;
            case 'Bien':
                setDropdownBackground('#2196f3');
                break;
            case 'Assez bien':
                setDropdownBackground('#ffc107');
                break;
            case 'Passable':
                setDropdownBackground('#ff9800');
                break;
            case 'Insuffisant':
                setDropdownBackground('#f44336');
                break;
            case 'Non évaluable':
                setDropdownBackground('#889795');
                break;
            // Ajoutez des cas pour les autres valeurs
            default:
                setDropdownBackground('#BF9E4E');
        }
    };

    // Utilisez la couleur de fond stockée dans l'état pour le style
    const dropdownStyle = {
        backgroundColor: dropdownBackground,
        // Ajoutez d'autres styles si nécessaire
    };

    if(!activity.is_free){
        return(
            <Row>
                {/*xs={12} md={12} lg={12} xl={5}*/}
                <Col xs={12} md={12} lg={12} xl={9}>
                    <Activity activity={ activity.name }></Activity>
                </Col>
                <Col xs={12} md={12} lg={12} xl={3}>
                    <Dropdown onSelect={handleSelect}>
                        <Dropdown.Toggle variant="success" id="dropdown-basic" className={"shadow"} style={dropdownStyle}>
                            { title }
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item eventKey="Excellent" href="#/action-1">Excellent</Dropdown.Item>
                            <Dropdown.Item eventKey="Très bien" href="#/action-2">Très bien</Dropdown.Item>
                            <Dropdown.Item eventKey="Bien" href="#/action-3">Bien</Dropdown.Item>
                            <Dropdown.Item eventKey="Assez bien" href="#/action-3">Assez bien</Dropdown.Item>
                            <Dropdown.Item eventKey="Passable" href="#/action-3">Passable</Dropdown.Item>
                            <Dropdown.Item eventKey="Insuffisant" href="#/action-3">Insuffisant</Dropdown.Item>
                            <Dropdown.Item eventKey="Non évaluable" href="#/action-3">Non évaluable</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Col>
                <hr className="separator" id={'separator'}/>
            </Row>
        )
    } else{
        return(
            <Row>
                <Col xs={12} md={12} lg={12} xl={4}>
                    <Activity activity={ activity.name }></Activity>
                </Col>
                <Col xs={12} md={12} lg={12} xl={8}>
                    <Form.Control as="textarea" rows={3} placeholder="Commentaire" id={"text-form"}/>
                </Col>
                <hr className="separator" id={'separator'}/>
            </Row>
        )
    }
}

export default Impression;