import { debounce } from 'lodash';
import {useCallback, useEffect, useState } from 'react';
import { Row, Col, Form, Spinner } from 'react-bootstrap';
import { FaCheck, FaTimes } from 'react-icons/fa';
import {getGrades, postGrade, updateGrade } from '../../../../_api/ActivityReportServices';
import { Heading2 } from "../../../ToolBox/Headings"
import { ParagraphSm } from "../../../ToolBox/Paragraphs"
import {FormGrades, FormImpressions, IGrade} from '../../Services/activityReportInterfaces';


function Assessment({ assessment, periodId, studentId } : any) {
    const [comment, setComment] = useState('');
    const [grade, setGrade] = useState<number>(); // Utiliser un nombre ou une chaîne vide pour la note
    const [isReadyToSave, setIsReadyToSave] = useState(false);
    // Ajouter un état pour suivre la dernière frappe
    const [lastTyped, setLastTyped] = useState(Date.now());


    const [saveStatus, setSaveStatus] = useState(''); // Pour stocker le statut de sauvegarde
    const [allGrades, setAllGrades] = useState<IGrade[]>([]); // Ajoutez cet état pour stocker toutes les impressions
    // Fonction pour sauvegarder l'impression
    const saveAssessment = async () => {
        if(grade == null || comment == ''){
            console.log("Grade ou comment vide. \n"+
                "Grade = "+grade+", \n"+
                "Comment = "+comment+", \n"
            );
        }else {
            const gradeData: FormGrades = {
                student_id: studentId,
                grade: grade, // Convertir en nombre si c'est une chaîne
                assessment_id: assessment.id,
                period_id: periodId,
                comment: comment,
                section_id: 5 // Supposons que vous avez un identifiant de section
            };
            console.log("Assessment data = " +
                "student_id = " + gradeData.student_id + ", \n" +
                "grade = " + gradeData.grade + ", \n" +
                "assessment_id = " + gradeData.assessment_id + ", \n" +
                "period_id = " + gradeData.period_id + ", \n" +
                "comment = " + gradeData.comment + ", \n" +
                "section_id = " + gradeData.section_id
            );
            handleSave(gradeData);
        }
    };

    const debouncedSaveAssessment = useCallback(debounce(() => {
        console.log("debouncedSaveAssessment : \n"+
            "Comment : " + comment + " \n"+
            "Grade : " + grade + " \n");

        if (comment !== '' && grade !== -1) { // Vérifiez si comment est non-vide et grade n'est pas vide ou zéro
            saveAssessment();
        }
    }, 3000), [comment, grade]);

    const handleSave = async (gradeData: FormGrades) => {
        // Mettez à jour la liste des grades avant de chercher une impression existante
        loadData();

        console.log('All Grades:', allGrades);
        const existingImpression = allGrades.find(imp =>
            imp.student_id === gradeData.student_id &&
            imp.assessment_id === gradeData.assessment_id &&
            imp.period_id == gradeData.period_id
        );
        console.log('Existing Impression:', existingImpression);

        if (existingImpression) {
            console.log("PUT");
            // Si une impression existe, mettez-la à jour avec un PUT
            try {
                console.log("GradeData in PUT : \n"
                    + "assessment_id: " +gradeData.assessment_id +", \n"
                    + "period_id: " +gradeData.period_id +", \n"
                    + "student_id: " +gradeData.student_id +", \n"
                    + "comment: " +gradeData.comment +", \n"
                    + "grade: " +gradeData.grade +", \n"
                    + "section_id: " +gradeData.section_id +", \n"
                );
                const response = await updateGrade(existingImpression.id, gradeData);
                setSaveStatus('Sauvegardé avec succès!');
                console.log('Impression mise à jour avec succès : ', response.data);
                loadData();
            } catch (error) {
                setSaveStatus('Erreur lors de la sauvegarde.');
                console.error('Erreur lors de l\'enregistrement de l\'impression:', error);
            }
        } else {
            console.log("POST");
            // Si aucune impression n'existe, créez-en une nouvelle avec un POST
            try {
                const response = await postGrade(gradeData);
                console.log('Impression enregistrée:', response.data);
                setSaveStatus('success');
                loadData();
            } catch (error) {
                setSaveStatus('error');
                console.error('Erreur lors de l\'enregistrement de l\'impression:', error);
            }
        }
    };

    // Récupérez toutes les impressions au montage du composant
    const fetchAllGrades = async () => {
        try {
            // console.log("GETALLIMPRESSIONS");
            const response = await getGrades();
            console.log("Response from getGrades = " + response);
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

    // Gère le changement dans le champ de commentaire
    const handleCommentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setComment(event.target.value);
        setLastTyped(Date.now());
        setIsReadyToSave(true); // Indiquez qu'une sauvegarde est nécessaire
        // debouncedSaveAssessment();
    };

    // Gère le changement dans le champ de note
    const handleGradeChange = (event: any) => {
        const newGrade: number = event.target.value;
        setGrade(newGrade);
        setLastTyped(Date.now());
        setIsReadyToSave(true); // Indiquez qu'une sauvegarde est nécessaire
        // debouncedSaveAssessment();
    };

    // Utilisez useEffect pour déclencher la sauvegarde après un délai d'inactivité
    useEffect(() => {
        const handle = setTimeout(() => {
            // Si aucune touche n'a été pressée pendant 1 seconde, sauvegardez
            if (Date.now() - lastTyped >= 3000 && isReadyToSave) {
                saveAssessment();
            }
        }, 3000);
        // Assurez-vous de nettoyer le timeout si le composant est démonté
        return () => clearTimeout(handle);
    }, [lastTyped, isReadyToSave]);

    return (
        <Col xs={12} md={12} lg={12} xl={4}>
            <Row>
                <Col xl={10}>
                    <h2 className={"heading4"}>{assessment.name}</h2>
                </Col>
                <Col xs={2}>
                    <div key={assessment.id}>
                        {renderStatusIcon()}
                    </div>
                </Col>
            </Row>

            <Form.Control
                as="textarea"
                rows={3}
                placeholder="Commentaire"
                id={"text-form"}
                value={comment}
                onChange={handleCommentChange}
            />
            <Row>
                <Col xs={9}>
                    <Form.Control
                        type="text"
                        placeholder="Note"
                        value={grade}
                        onChange={handleGradeChange}
                        // onBlur={handleBlur}
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