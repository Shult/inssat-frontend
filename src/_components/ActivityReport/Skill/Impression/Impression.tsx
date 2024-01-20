import React, {useEffect, useState } from 'react';
import { Row, Col, Dropdown, Form } from 'react-bootstrap';
import {getLevels, postImpression } from '../../../../_api/ActivityReportServices';
import "../../../ToolBox/styles.css"
import {FormImpressions, IActivity2, ILevel} from '../../Services/activityReportInterfaces';
import { getButtonColor } from '../../Services/ActivityReportServices';
import Activity from "../Activity/Activity"
import "./impression.css"


function Impression(data : any) {
    const activity = data.activity;
    const impression = data.impression;

    const [title, setTitle] = useState('Évaluer la compétence');
    const [level, setLevel] = useState<string>('');

    const [dropdownBackground, setDropdownBackground] = useState('#889795'); // Ajout de l'état pour la couleur de fond
    
    // GET 
    const [levels, setLevels] = useState<ILevel[]>([]);

    const fetchLevels = async () : Promise<ILevel[]> => {
        try {
            const response = await getLevels();
            if (response.ok && response.data) {
                const dataApi : ILevel[] = response.data;
                // console.log("dataApi Levels : " + dataApi);
                // Traitez et affichez les données ici
                return dataApi
            } else {
                // Gérez les erreurs ici (par exemple, réponse non ok)
                console.error('Erreur lors de la récupération des sections 2');
                return [];
            }
        } catch (error) {
            console.error('Erreur lors de la récupération des sections 1 :', error);
            return [];
        }
    };

    const handleSave = async (impressionData: FormImpressions) => {
        try {
            const response = await postImpression(impressionData);
            console.log('Impression enregistrée:', response.data);
        } catch (error) {
            console.error('Erreur lors de l\'enregistrement de l\'impression:', error);
        }
    };

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

    useEffect(() => {
        fetchLevels().then(fetchedLevels => {
            setLevels(fetchedLevels);
        });
    }, []);

    if(!activity.is_free){
        return(
            <Row>
                <Col xs={12} md={12} lg={12} xl={9}>
                    <Activity activity={ activity.name }></Activity>
                </Col>
                <Col xs={12} md={12} lg={12} xl={3}>
                    <Dropdown onSelect={handleSelect}>
                        <Dropdown.Toggle variant="success" id="dropdown-basic" className={"shadow"} style={dropdownStyle}>
                            { title }
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            {
                                // .slice(0, 6)
                                levels.map((level, index) => (
                                    <Dropdown.Item key={index} eventKey={level.name} href={`#/levels-${level.id}`}>{level.name}</Dropdown.Item>
                                ))
                            }
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