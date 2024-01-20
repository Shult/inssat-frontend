import React, {useCallback, useEffect, useState } from 'react';
import { Row, Col, Dropdown, Form } from 'react-bootstrap';
import {getImpressions, getLevels, postImpression, updateImpression } from '../../../../_api/ActivityReportServices';
import "../../../ToolBox/styles.css"
import {FormImpressions, IActivity2, IImpression, ILevel} from '../../Services/activityReportInterfaces';
import { getButtonColor } from '../../Services/ActivityReportServices';
import Activity from "../Activity/Activity"
import "./impression.css"

import debounce from 'lodash/debounce';

// interface IImpression {
//     activity: string,
//     studentId: number,
//     periodId: number
// }


// function Impression(data : any) {
function Impression({ activity, studentId, periodId } : any) {
    // const activity = data.activity;
    // const impression = data.impression;

    const [title, setTitle] = useState('Évaluer la compétence');
    const [level, setLevel] = useState<number>(0);

    const [dropdownBackground, setDropdownBackground] = useState('#889795'); // Ajout de l'état pour la couleur de fond
    
    // GET 
    const [levels, setLevels] = useState<ILevel[]>([]);
    const [allImpressions, setAllImpressions] = useState<IImpression[]>([]); // Ajoutez cet état pour stocker toutes les impressions

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

    // Récupérez toutes les impressions au montage du composant
    const fetchAllImpressions = async () => {
        try {
            const response = await getImpressions();
            if (response.ok && response.data) {
                setAllImpressions(response.data);
            } else {
                console.error('Erreur lors de la récupération des impressions');
            }
        } catch (error) {
            console.error('Erreur lors de la récupération des impressions:', error);
        }
    };

    const [saveStatus, setSaveStatus] = useState(''); // Pour stocker le statut de sauvegarde

    const handleSave = async (impressionData: FormImpressions) => {
        console.log("Data ready to be send : "
            + "Content " +  impressionData.content + ", "
            + "student_id " +  impressionData.student_id + ", "
            + "activity_id " +  impressionData.activity_id + ", "
            + "level_id " +  impressionData.level_id + ", "
            + "period_id " +  impressionData.period_id
        );

        // Vérifiez si une impression existe déjà
        const existingImpression = allImpressions.find(imp => imp.activity_id === impressionData.activity_id && imp.student_id === impressionData.student_id && imp.period_id === impressionData.period_id);

        if (existingImpression) {
            console.log("PUT");
            // Si une impression existe, mettez-la à jour avec un PUT
            try {
                const response = await updateImpression(existingImpression.id, impressionData);
                setSaveStatus('Sauvegardé avec succès!');
                console.log('Impression mise à jour avec succès : ', response.data);
            } catch (error) {
                setSaveStatus('Erreur lors de la sauvegarde.');
                console.error('Erreur lors de l\'enregistrement de l\'impression:', error);
            }
        } else {
            console.log("POST");
            // Si aucune impression n'existe, créez-en une nouvelle avec un POST
            try {
                const response = await postImpression(impressionData);
                console.log('Impression enregistrée:', response.data);
                setSaveStatus('Sauvegardé avec succès!');
                fetchAllImpressions();
            } catch (error) {
                setSaveStatus('Erreur lors de la sauvegarde.');
                console.error('Erreur lors de l\'enregistrement de l\'impression:', error);
            }
        }


        // try {
        //     const response = await postImpression(impressionData);
        //     console.log('Impression enregistrée:', response.data);
        // } catch (error) {
        //     console.error('Erreur lors de l\'enregistrement de l\'impression:', error);
        // }
    };

    const handleSelect = (eventKey : any) => {
        setSaveStatus('Sauvegarde en cours...');
        // setTitle(levelName);
        const levelName = eventKey;
        const selectedLevelId = levels.find(level => level.name === levelName)?.id;
        console.log("Handle Select dropdown : Name = "+levelName+", id = "+selectedLevelId);
        if (selectedLevelId) {
            console.log("Handle Select dropdown : Levelid");
            setTitle(levelName);
            setLevel(selectedLevelId); // Supposons que vous stockez l'ID du niveau sélectionné
            setComment("selectedItem/"+levelName);
            debouncedSaveImpression(selectedLevelId, "selectedItem/"+levelName);
        }

        // Mettre à jour la couleur de fond en fonction de la sélection
        switch (levelName) {
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


    // AUTO SAVE START
    // const [content, setContent] = useState('');
    const [comment, setComment] = useState('');

    // Fonction pour sauvegarder l'impression
    const saveImpression = async (levelId : any, comment : any) => {
        const impressionData: FormImpressions = {
            content: comment,
            level_id: levelId, // Supposons que level_id correspond à un identifiant de niveau
            activity_id: activity.id,
            period_id: periodId,
            student_id: studentId,
        };
        handleSave(impressionData);
    };

    // Fonction debounce pour sauvegarder l'impression
    const debouncedSaveImpression = useCallback(debounce(saveImpression, 3000), []);


    // Gère le changement dans le commentaire
    const handleCommentChange = (event : any) => {
        setSaveStatus('Sauvegarde en cours...');
        const newComment = event.target.value;
        console.log("Handle Select textField : comment = "+newComment);
        setComment(newComment);
        setLevel(8);
        if (level) {
            console.log("Level OK")
            debouncedSaveImpression(level, newComment);
        }
    };


    // AUTO SAVE END



    useEffect(() => {
        fetchAllImpressions();
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
                                levels.slice(0, 7).map((level, index) => (

                                        <Dropdown.Item key={index} eventKey={ level.name } href={`#/levels-${level.id}`}>{level.name}</Dropdown.Item>

                                ))
                            }
                        </Dropdown.Menu>
                    </Dropdown>
                    <div>
                        <p>{saveStatus}</p> {/* Afficher le message de statut ici */}
                    </div>
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
                    <Form.Control
                        as="textarea"
                        rows={3}
                        placeholder="Commentaire"
                        id={"text-form"}
                        value={comment}
                        onChange={handleCommentChange}/>
                    <div>
                        <p>{saveStatus}</p> {/* Afficher le message de statut ici */}
                    </div>
                </Col>
                <hr className="separator" id={'separator'}/>
            </Row>
        )
    }
}

export default Impression;