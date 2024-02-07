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

    const [isLoading, setIsLoading] = useState(true);

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
        if (isLoading) {
            // console.log("Les données ne sont pas encore chargées.");
            return;
        }

        // console.log("Student Assessment : " + gradeData.student_id)
        const existingImpression = allGrades.find(imp => {
            // console.log("Vérification de l'impression :",
            //     imp.assessment_id + " = " + gradeData.assessment_id + " ? \n" +
            //     imp.student_id + " = " + gradeData.student_id + " ? \n" +
            //     imp.period_id + " = " + gradeData.period_id + " ? \n"
            // );

            return imp.student_id == gradeData.student_id &&
                imp.assessment_id == gradeData.assessment_id &&
                imp.period_id == gradeData.period_id;
        });


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
        setIsLoading(true);
        await fetchAllGrades();
        setIsLoading(false);
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
        loadData();
    }, []);

    useEffect(() => {
        const handle = setTimeout(() => {
            // Si aucune touche n'a été pressée pendant 1 seconde, sauvegardez
            if (Date.now() - lastTyped >= 3000 && isReadyToSave) {
                saveAssessment();
            }
        }, 3000);
        return () => clearTimeout(handle);
    }, [lastTyped, isReadyToSave]);


    useEffect(() => {
        loadData();
    }, []);

    useEffect(() => {
        if (allGrades.length > 0) {
            const existingGrade = allGrades.find(grade =>
                grade.assessment_id == assessment.id &&
                grade.student_id == studentId &&
                grade.period_id == periodId
            );

            if (existingGrade) {
                setComment(existingGrade.comment || '');
                setGrade(existingGrade.grade || 0);
            }
        }
    }, [allGrades, assessment.id, studentId, periodId]);

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
                        type="number"
                        placeholder="Note"
                        value={grade}
                        onChange={handleGradeChange}
                        min="0"
                        max="20"
                        step="0.01" // Permet l'entrée de nombres à virgule flottante
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