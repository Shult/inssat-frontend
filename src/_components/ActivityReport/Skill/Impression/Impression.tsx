import React, {useCallback, useEffect, useState } from 'react';
import { Row, Col, Dropdown, Form, Spinner } from 'react-bootstrap';
import {getImpressions, getLevels, postImpression, updateImpression } from '../../../../_api/ActivityReportServices';
import "../../../ToolBox/styles.css"
import {FormImpressions, IActivity2, IImpression, ILevel} from '../../Services/activityReportInterfaces';
import { getButtonColor } from '../../Services/ActivityReportServices';
import Activity from "../Activity/Activity"
import "./impression.css"

import debounce from 'lodash/debounce';
import { FaCheck, FaTimes } from 'react-icons/fa';


function Impression({ activity, studentId, periodId } : any) {
    // const activity = data.activity;
    // const impression = data.impression;

    // console.log("PeriodId Impressions = "+ periodId);
    const [title, setTitle] = useState('Évaluer la compétence');
    const [level, setLevel] = useState<number>(0);

    const [dropdownBackground, setDropdownBackground] = useState('#889795'); // Ajout de l'état pour la couleur de fond
    
    // GET 
    const [levels, setLevels] = useState<ILevel[]>([]);
    const [allImpressions, setAllImpressions] = useState<IImpression[]>([]); // Ajoutez cet état pour stocker toutes les impressions

    const [lastTyped, setLastTyped] = useState(Date.now());
    const [isReadyToSave, setIsReadyToSave] = useState(false);

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
            // console.log("GETALLIMPRESSIONS");
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
        // Appel asynchrone pour charger les données
        loadData();

        // console.log('All Impressions:', allImpressions);
        // console.log('Looking for impression with :\n' +
        //     'activity_id:', impressionData.activity_id,'\n',
        //     'student_id:', impressionData.student_id,'\n',
        //     'period_id:', impressionData.period_id,'\n'
        // );

        // Vérifiez si une impression existe déjà
        const existingImpression = allImpressions.find(imp =>
            imp.activity_id === impressionData.activity_id &&
            imp.student_id === impressionData.student_id &&
            imp.period_id == impressionData.period_id
        );
        // console.log('Existing Impression:', existingImpression);

        if (existingImpression) {
            // console.log("PUT");
            // Si une impression existe, mettez-la à jour avec un PUT
            try {
                const response = await updateImpression(existingImpression.id, impressionData);
                setSaveStatus('success');
                // console.log('Impression mise à jour avec succès : ', response.data);
                loadData();
            } catch (error) {
                setSaveStatus('error');
                // console.error('Erreur lors de l\'enregistrement de l\'impression:', error);
            }
        } else {
            // console.log("POST");
            // Si aucune impression n'existe, créez-en une nouvelle avec un POST
            try {
                const response = await postImpression(impressionData);
                // console.log('Impression enregistrée:', response.data);
                setSaveStatus('success');
                loadData();
            } catch (error) {
                setSaveStatus('error');
                // console.error('Erreur lors de l\'enregistrement de l\'impression:', error);
            }
        }
    };
    const loadData = async () => {
        await fetchAllImpressions(); // Attendre que les impressions soient chargées
        // Ici vous pouvez continuer avec d'autres opérations qui dépendent des impressions
    };

    // Gère le changement dans le commentaire
    const handleCommentChange = (event : any) => {
        setSaveStatus('loading');
        const newComment = event.target.value;
        setComment(newComment);
        setLevel(8);    // 8 is for the impressions with a comment
        setIsReadyToSave(true); // Indiquez qu'une sauvegarde est nécessaire
        setLastTyped(Date.now()); // Mettez à jour le temps de la dernière frappe
    };
    const handleSelect = (eventKey : any) => {
        setSaveStatus('loading');
        // console.log("EventKey = " + eventKey);
        const levelName = eventKey;
        const selectedLevelId = levels.find(level => level.name === levelName)?.id;
        // console.log("selectedLevelId = " + selectedLevelId);
        if (selectedLevelId) {
            setTitle(levelName);

            setComment("selectedItem/"+levelName);
            setLevel(selectedLevelId); // Supposons que vous stockez l'ID du niveau sélectionné
            setIsReadyToSave(true); // Indiquez qu'une sauvegarde est nécessaire
            setLastTyped(Date.now()); // Mettez à jour le temps de la dernière frappe
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
    const saveImpression = async () => {
        // console.log("Period saveImpressions = " + periodId);
        const impressionData: FormImpressions = {
            content: comment,
            level_id: level, // Supposons que level_id correspond à un identifiant de niveau
            activity_id: activity.id,
            period_id: periodId,
            student_id: studentId,
        };
        handleSave(impressionData);
    };

    // Fonction debounce pour sauvegarder l'impression
    const debouncedSaveImpression = useCallback(debounce(() => {
        if (isReadyToSave) {
            saveImpression();
        }
    }, 3000), [isReadyToSave, level, comment]);

    // Fonction pour choisir l'icône en fonction de l'état de sauvegarde
    const renderStatusIcon = () => {
        switch (saveStatus) {
            case 'loading':
                return <Spinner animation="border" />;
            case 'success':
                return <FaCheck color="green" />;
            case 'error':
                return <FaTimes color="red" />;
            default:
                return null;
        }
    };
    // AUTO SAVE END


    useEffect(() => {
        fetchLevels().then(fetchedLevels => {
            setLevels(fetchedLevels);
        });
        const handle = setTimeout(() => {
            if (Date.now() - lastTyped >= 3000 && isReadyToSave) {
                debouncedSaveImpression(); // Utilisez la fonction debounced ici
            }
        }, 3000);
        return () => clearTimeout(handle);
    }, [lastTyped, isReadyToSave, debouncedSaveImpression]);


    if(!activity.is_free){
        return(
            <Row>
                <Col xs={12} md={12} lg={12} xl={8}>
                    <Activity activity={ activity.name }></Activity>
                </Col>
                <Col xs={12} md={12} lg={12} xl={3}>
                    <Dropdown onSelect={handleSelect}>
                        <Dropdown.Toggle variant="success" id="dropdown-basic" className={"shadow"} style={dropdownStyle}>
                            { title }
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            {
                                levels.slice(0, 7).map((level, index) => (
                                    <Dropdown.Item key={index} eventKey={ level.name }>{level.name}</Dropdown.Item>
                                ))
                            }
                        </Dropdown.Menu>
                    </Dropdown>
                </Col>
                <Col xs={12} md={12} lg={12} xl={1}>
                    <div key={activity.id}>
                        {renderStatusIcon()}
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
                <Col xs={12} md={12} lg={12} xl={7}>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        placeholder="Commentaire"
                        id={"text-form"}
                        value={comment}
                        onChange={handleCommentChange}/>

                </Col>
                <Col xs={12} md={12} lg={12} xl={1}>
                    <div key={activity.id}>
                        {renderStatusIcon()}
                    </div>
                </Col>
                <hr className="separator" id={'separator'}/>
            </Row>
        )
    }
}

export default Impression;