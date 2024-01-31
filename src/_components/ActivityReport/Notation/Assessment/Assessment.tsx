import {useEffect, useState } from 'react';
import { Row, Col, Form, Spinner } from 'react-bootstrap';
import { FaCheck, FaTimes } from 'react-icons/fa';
import {getGrades, postGrade, updateGrade } from '../../../../_api/ActivityReportServices';
import { Heading2 } from "../../../ToolBox/Headings"
import { ParagraphSm } from "../../../ToolBox/Paragraphs"
import {FormGrades, IGrade} from '../../Services/activityReportInterfaces';

function Assessment({ assessment, periodId, studentId } : any) {
    const [comment, setComment] = useState('');
    const [grade, setGrade] = useState<number>();
    const [isReadyToSave, setIsReadyToSave] = useState(false);
    const [lastTyped, setLastTyped] = useState(Date.now());
    const [saveStatus, setSaveStatus] = useState('');
    const [allGrades, setAllGrades] = useState<IGrade[]>([]);

    // Fonction pour sauvegarder l'impression
    const saveAssessment = async () => {
        if(grade == null || comment == ''){

        }else {
            const gradeData: FormGrades = {
                student_id: studentId,
                grade: grade,
                assessment_id: assessment.id,
                period_id: periodId,
                comment: comment,
                section_id: 5
            };
            handleSave(gradeData);
        }
    };

    const handleSave = async (gradeData: FormGrades) => {
        loadData();

        const existingImpression = allGrades.find(imp =>
            imp.student_id === gradeData.student_id &&
            imp.assessment_id === gradeData.assessment_id &&
            imp.period_id == gradeData.period_id
        );

        if (existingImpression) {
            try {
                await updateGrade(existingImpression.id, gradeData);
                setSaveStatus('success');
                loadData();
            } catch (error) {
                setSaveStatus('error');
                console.error('Erreur lors de l\'enregistrement de l\'impression:', error);
            }
        } else {
            try {
                await postGrade(gradeData);
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
        await fetchAllGrades();
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
        setSaveStatus('loading');
        setComment(event.target.value);
        setLastTyped(Date.now());
        setIsReadyToSave(true);
    };

    // Gère le changement dans le champ de note
    const handleGradeChange = (event: any) => {
        setSaveStatus('loading');
        const newGrade: number = event.target.value;
        setGrade(newGrade);
        setLastTyped(Date.now());
        setIsReadyToSave(true);
    };

    useEffect(() => {
        const handle = setTimeout(() => {
            // Si aucune touche n'a été pressée pendant 1 seconde, sauvegardez
            if (Date.now() - lastTyped >= 3000 && isReadyToSave) {
                saveAssessment();
            }
        }, 3000);
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