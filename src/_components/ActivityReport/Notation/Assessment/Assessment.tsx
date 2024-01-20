import { debounce } from 'lodash';
import {useCallback, useEffect, useState } from 'react';
import { Row, Col, Form, Spinner } from 'react-bootstrap';
import { FaCheck, FaTimes } from 'react-icons/fa';
import {getGrades, postGrade, updateGrade } from '../../../../_api/ActivityReportServices';
import { Heading2 } from "../../../ToolBox/Headings"
import { ParagraphSm } from "../../../ToolBox/Paragraphs"
import {FormGrades, FormImpressions, IGrade} from '../../Services/activityReportInterfaces';


function Assessment({ assessment, periodId, studentId } : any) {
    console.log("PeriodId asssessment = " + periodId);

    const [saveStatus, setSaveStatus] = useState(''); // Pour stocker le statut de sauvegarde
    const [comment, setComment] = useState('');
    const [grade, setGrade] = useState<number>(0);
    const [allGrades, setAllGrades] = useState<IGrade[]>([]); // Ajoutez cet état pour stocker toutes les impressions

    // Gère le changement dans le commentaire
    const handleCommentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {

        // const handleCommentChange = (event : any) => {
        // setSaveStatus('loading');
        // const newComment = event.target.value;
        // console.log("Handle Select textField : comment = "+newComment);
        // setComment(newComment);
        // setGrade(8);
        // if (grade) {
        //     // console.log("Level OK")
        //     debouncedSaveImpression(grade, newComment);
        // }
        setComment(event.target.value);
        // debouncedSaveGrade();
    };

    // Fonction pour sauvegarder l'impression
    const saveGrade = async (grade : any, comment : any) => {
        // console.log("Period saveImpressions = " + periodId);
        const gradeData: FormGrades = {
            student_id: studentId,
            grade: grade,
            assessment_id: assessment,
            period_id: periodId,
            comment: comment,
            section_id: 0
        };
        handleSave(gradeData);
    };

    const debouncedSaveGrade = useCallback(debounce(saveGrade, 3000), []);

    const handleSave = async (impressionData: FormGrades) => {
        console.log('All Grades:', allGrades);
        console.log('Looking for impression with ' +
            'activity_id:', impressionData.assessment_id,
            'student_id:', impressionData.student_id,
            'period_id:', impressionData.period_id
        );

        // Vérifiez si une impression existe déjà
        const existingImpression = allGrades.find(imp =>
            imp.assessment_id === impressionData.assessment_id &&
            imp.student_id === impressionData.student_id &&
            imp.period_id === impressionData.period_id
        );
        console.log('Existing Impression:', existingImpression);

        if (existingImpression) {
            console.log("PUT");
            // Si une impression existe, mettez-la à jour avec un PUT
            try {
                const response = await updateGrade(existingImpression.id, impressionData);
                setSaveStatus('Sauvegardé avec succès!');
                console.log('Impression mise à jour avec succès : ', response.data);
                loadData();
            } catch (error) {
                setSaveStatus('Erreur lors de la sauvegarde.');
                // console.error('Erreur lors de l\'enregistrement de l\'impression:', error);
            }
        } else {
            console.log("POST");
            // Si aucune impression n'existe, créez-en une nouvelle avec un POST
            try {
                const response = await postGrade(impressionData);
                console.log('Impression enregistrée:', response.data);
                setSaveStatus('success');
                // fetchAllImpressions();

                loadData();
            } catch (error) {
                setSaveStatus('error');
                // console.error('Erreur lors de l\'enregistrement de l\'impression:', error);
            }
        }
    };

    // Récupérez toutes les impressions au montage du composant
    const fetchAllGrades = async () => {
        try {
            // console.log("GETALLIMPRESSIONS");
            const response = await getGrades();
            if (response.ok && response.data) {
                setAllGrades(response.data);
            } else {
                console.error('Erreur lors de la récupération des impressions');
            }
        } catch (error) {
            console.error('Erreur lors de la récupération des impressions:', error);
        }
    };
    const loadData = async () => {
        await fetchAllGrades(); // Attendre que les impressions soient chargées
        // Ici vous pouvez continuer avec d'autres opérations qui dépendent des impressions
    };

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
        loadData();
    }, []);

    return (
        <Col xs={12} md={12} lg={12} xl={4}>
            <h2 className={"heading4"}>{assessment.name}</h2>
            <div key={assessment.id}>
                {renderStatusIcon()}
            </div>
            <Form.Control
                as="textarea"
                rows={3}
                placeholder="Commentaire"
                id={"text-form"}
            />
            <Row>
                <Col xs={9}>
                    <Form.Control
                        type="text"
                        placeholder="Note"
                        onChange={handleCommentChange}
                    />
                </Col>
                <Col xs={3}>
                    <Heading2>/20</Heading2>
                </Col>
            </Row>
            <div className="d-flex justify-content-center ">
                <ParagraphSm>Coef. {assessment.coefficient}</ParagraphSm>
            </div>
        </Col>
    )
}

export default Assessment;