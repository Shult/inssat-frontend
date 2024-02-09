import "./ApprenticeshipManagement.modal.css";
import UserDropdown from "../../../_components/User/UserDropdown";
import Button from "../../../_components/Clickable/Button";
import { createStudentMaTutor } from "../../../_api/student-ma-tutors";
import React from "react";
import { Row, Col } from 'react-bootstrap';

interface ModalAssociationProps {
    onValidate: () => void;
    show: boolean;
}

const ModalAssociationCreation: React.FC<ModalAssociationProps> = ({ onValidate, show }) => {
    if (!show) return null;

    return (
        <>
            <article className={"w100 space-between ApprenticeshipManagementModal"}>
                <h2 className={"w100"}>Créer une nouvelle association</h2>

                <Row className="w100"> {/* Utilisation du composant Row de React Bootstrap */}
                    <Col xs={4}>
                        <UserDropdown id={"select-student"} usertype={"student"} />
                    </Col>
                    <Col xs={4}>
                        <UserDropdown id={"select-tutor"} usertype={"teacher"} />
                    </Col>
                    <Col xs={4}>
                        <UserDropdown id={"select-supervisor"} usertype={"supervisor"} />
                    </Col>
                </Row>

                <div className={"line w100 space-around"}>
                    <Button className={"buttonGold txtCenter"}
                            name={"createApprenticeshipAssociation"}
                            content={"Valider"}
                            onclick={() => {
                                createStudentMaTutor({
                                    student_id: (document.getElementById("select-student") as HTMLSelectElement).value,
                                    tutor_id: (document.getElementById("select-tutor") as HTMLSelectElement).value,
                                    ma_id: (document.getElementById("select-supervisor") as HTMLSelectElement).value
                                });
                                onValidate();
                            }}
                    />
                </div>
            </article>
        </>
    );
};

export default ModalAssociationCreation;
