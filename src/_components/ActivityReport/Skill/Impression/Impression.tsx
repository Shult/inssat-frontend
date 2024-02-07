import React, {useCallback, useEffect, useState } from 'react';
import { Row, Col, Dropdown, Form, Spinner } from 'react-bootstrap';
import {getGradesAndAssessmentsByPeriod, getImpressions, getLevels, postImpression, updateImpression, updateImpressionOnlyLevel } from '../../../../_api/ActivityReportServices';
import "../../../ToolBox/styles.css"
import {FormImpressions, IImpression, ILevel} from '../../Services/activityReportInterfaces';
import Activity from "../Activity/Activity"
import "./impression.css"
import {Grade, Impression as ImpressionInterface, Section, UserData} from "../../Services/interfaces"
import debounce from 'lodash/debounce';
import { FaCheck, FaTimes } from 'react-icons/fa';
import { getButtonColorById } from '../../Services/ActivityReportServices';


function Impression({ activity, studentId, periodId } : any) {
    const [title, setTitle] = useState('Évaluer la compétence');
    const [level, setLevel] = useState<number>(0);
    const [dropdownBackground, setDropdownBackground] = useState('#889795');

    // GET
    const [levels, setLevels] = useState<ILevel[]>([]);
    const [allImpressions, setAllImpressions] = useState<IImpression[]>([]);
    const [lastTyped, setLastTyped] = useState(Date.now());
    const [isReadyToSave, setIsReadyToSave] = useState(false);


    const [isLoading, setIsLoading] = useState(true);

    const [sections, setSections] = useState<Section[]>();

    const [periodSelected, setPeriodSelected] = useState<number>(0);
    const [userId, setUserId] = useState<any>();

    const [data, setData] = useState<UserData>({
        ID: "",
        USERNAME: "",
        FIRST_NAME: "",
        LAST_NAME: "",
        EMAIL: "",
        USER_ATTRIBUTES: [],
        grades: [],
        impressions: []
    });

    const fetchLevels = async () : Promise<ILevel[]> => {
        try {
            const response = await getLevels();
            if (response.ok && response.data) {
                const dataApi : ILevel[] = response.data;
                // console.log("dataApi Levels : " + dataApi);
                return dataApi
            } else {
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
        // console.log('handleSave')
        await loadData()
        if (isLoading) {
            console.log("Les données ne sont pas encore chargées.");
            return;
        }

        const existingImpression = allImpressions.find(imp => {
            // Ajout d'un log pour imprimer les détails de l'impression actuelle
            // console.log("Vérification de l'impression :",
            //     imp.activity_id + " = " + impressionData.activity_id + " ? \n" +
            //     imp.student_id + " = " + impressionData.student_id + " ? \n" +
            //     imp.period_id + " = " + impressionData.period_id + " ? \n"
            // );

            return imp.activity_id == impressionData.activity_id &&
                imp.student_id == impressionData.student_id &&
                imp.period_id == impressionData.period_id;
        });
        // console.log(
        //     impressionData.activity_id + ", \n" +
        //     impressionData.student_id + ", \n" +
        //     impressionData.period_id + ", \n"
        // )
        // console.log("existingImpression")
        // console.log(existingImpression)
        if (existingImpression) {
            // console.log("PUT");
            try {
                // await updateImpressionOnlyLevel(existingImpression.id, impressionData.level_id);
                await updateImpression(existingImpression.id, impressionData);
                setSaveStatus('success');
                loadData();
            } catch (error) {
                setSaveStatus('error');
            }
        } else {
            // console.log("POST");
            try {
                await postImpression(impressionData);
                setSaveStatus('success');
                loadData();
            } catch (error) {
                setSaveStatus('error');
            }
        }
    };
    // const loadData = async () => {
    //     await fetchAllImpressions();
    // };
    const loadData = async () => {
        if (userId && periodId) { // Assurez-vous que userId et periodId ne sont pas undefined
            setIsLoading(true);
            await fetchAllImpressions();
            setIsLoading(false);
        }
    };

    // Gère le changement dans le commentaire
    const handleCommentChange = (event : any) => {
        setSaveStatus('loading');
        const newComment = event.target.value;
        setComment(newComment);
        setLevel(7);
        setIsReadyToSave(true);
        setLastTyped(Date.now());
    };
    const handleSelect = (eventKey : any) => {
        setSaveStatus('loading');
        const levelName = eventKey;
        const selectedLevelId = levels.find(level => level.name === levelName)?.id;
        if (selectedLevelId) {
            setTitle(levelName);

            setComment(" ");
            setLevel(selectedLevelId);
            setIsReadyToSave(true);
            setLastTyped(Date.now());
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

    const dropdownStyle = {
        backgroundColor: dropdownBackground,
    };

    const [comment, setComment] = useState('');

    // Fonction pour sauvegarder l'impression
    const saveImpression = async () => {
        console.log("saveImpression")
        const impressionData: FormImpressions = {
            content: comment,
            level_id: level,
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

    useEffect(() => {
        if (data.impressions && data.impressions.length > 0) {
            // Supposons que 'filteredImpressions' soit l'impression existante que vous avez déjà filtrée
            const existingImpression = filteredImpressions[0]; // Prenez la première impression si elle existe

            if (existingImpression) {
                // Mettez à jour le commentaire avec le contenu de l'impression existante
                setComment(existingImpression.content || ''); // Utilisez une chaîne vide si le contenu est 'undefined' ou 'null'
            }
        }
    }, [data.impressions]);

    useEffect(() => {
            // setUserId("b307a9d1-21ec-4ad8-a53e-f72f14f5fb6e"); // A MODIF EN ALLANT CHERCHER LE USER

            // fetchPeriods().then(fetchedPeriods => {
            //     setPeriods(fetchedPeriods);
            // });
            if(userId==undefined && periodSelected == 0){
                // console.log("UNDEFINED")
            }else {
                getGradesAndAssessmentsByPeriod(userId, periodSelected)
                    .then(response => {
                        if (response.ok && response.data) {
                            // console.log("Data getGradesAndAssessmentsByPeriod = " + response.data)
                            // console.log(response.data)

                            let sectionsMap = new Map();
                            let activitiesMap = new Map();
                            let impressionsMap = new Map();


                            // Traiter les impressions pour extraire les sections
                            response.data.impressions.forEach((impression : ImpressionInterface)  => {
                                sectionsMap.set(impression.activity.section.id, impression.activity.section);
                            });
                            // Traiter les grades pour extraire les sections (si applicable)
                            response.data.grades.forEach((grade : Grade) => {
                                sectionsMap.set(grade.section.id, grade.section);
                            });


                            // Traiter les impressions pour regrouper les activités par section
                            response.data.impressions.forEach((impression : ImpressionInterface) => {
                                let section = sectionsMap.get(impression.activity.section.id);
                                if (section) {
                                    if (!activitiesMap.has(section.id)) {
                                        activitiesMap.set(section.id, []);
                                    }
                                    activitiesMap.get(section.id).push(impression.activity);
                                }
                            });


                            // Convertir les sectionsMap en tableau pour l'état
                            let sectionsArray: Section[] = Array.from(sectionsMap.values()).filter((section : Section) => section.title !== "Notation");
                            sectionsArray.forEach(section => {
                                if (activitiesMap.has(section.id)) {
                                    section.activities = activitiesMap.get(section.id);
                                } else {
                                    section.activities = [];
                                }
                            });


                            // Traiter les impressions pour regrouper par activité
                            response.data.impressions.forEach((impression: ImpressionInterface) => {
                                let activityId = impression.activity_id;
                                if (!impressionsMap.has(activityId)) {
                                    impressionsMap.set(activityId, []);
                                }
                                impressionsMap.get(activityId).push(impression);
                            });
                            sectionsArray.forEach(section => {
                                section.activities.forEach(activity => {
                                    if (impressionsMap.has(activity.id)) {
                                        activity.impressions = impressionsMap.get(activity.id);
                                    } else {
                                        activity.impressions = [];
                                    }
                                });
                            });


                            sectionsArray.map((section, index) => {
                                // console.log("Section " + index + " : " + section.title)
                            })
                            setSections(sectionsArray);
                            setData(prevData => ({
                                ...prevData,
                                impressions: response.data.impressions || prevData.impressions,
                                grades: response.data.grades.map((grade : Grade) => ({
                                    ...grade,
                                    assessment: grade.assessment
                                }))
                            }));
                        } else {
                            // console.error('Erreur lors de la récupération des données');
                        }
                    })
                    .catch(error => {
                        console.error('Erreur lors de la connexion à l\'API:', error);
                    });
            }


        }, [periodSelected, userId]
    );

    useEffect(() => {
        setUserId(studentId);
        // setTitle(`Période ${periodId}`);
        setPeriodSelected(Number(periodId));
        loadData();
    }, [periodSelected, periodId]);


    useEffect(() => {
        fetchLevels().then(fetchedLevels => {
            setLevels(fetchedLevels);
        });
        const handle = setTimeout(() => {
            if (Date.now() - lastTyped >= 3000 && isReadyToSave) {
                debouncedSaveImpression();
            }
        }, 3000);
        return () => clearTimeout(handle);
    }, [lastTyped, isReadyToSave, debouncedSaveImpression]);


    // console.log("data.impressions")
    // console.log(data.impressions)

    const filteredImpressions = data.impressions.filter(impression => impression.activity.id === activity.id);

    // console.log("Impressions filtrées par activity_id:", filteredImpressions);


    useEffect(() => {
        if (data.impressions && data.impressions.length > 0) {
            // Supposons que 'filteredImpressions' soit l'impression existante que vous avez déjà filtrée
            const existingImpression = filteredImpressions[0]; // Prenez la première impression si elle existe

            if (existingImpression) {
                // Trouvez les détails du niveau correspondant à 'existingImpression.level_id'
                const levelDetails = levels.find(level => level.id === existingImpression.level_id);

                if (levelDetails) {
                    // Mettez à jour le titre du Dropdown avec le nom du niveau
                    setTitle(levelDetails.name);

                    // Vous pouvez également mettre à jour la couleur de fond ici si nécessaire
                    // Par exemple, en utilisant une fonction qui retourne la couleur basée sur le niveau
                    const backgroundColor = getButtonColorById(existingImpression.level_id); // Remplacez par votre fonction réelle
                    setDropdownBackground(backgroundColor);
                }
            }
        }
    }, [data.impressions]);


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