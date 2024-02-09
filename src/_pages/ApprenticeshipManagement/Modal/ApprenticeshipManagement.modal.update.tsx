import UserDropdown from '../../../_components/User/UserDropdown';
import Button from '../../../_components/Clickable/Button';

import {getUsersMock} from '../../../_components/User/User.api';
import {updateAssociationMock} from '../../../_components/User/ApprenticeshipAssociation/Association.api';

import './ApprenticeshipManagement.modal.css'
import React, { useEffect, useState } from "react";
import { getUserById } from '../../../_api/user';
import { Col, Row } from 'react-bootstrap';

interface ModalAssociationUpdtProps {
    onValidate: () => void;
    show: boolean;
    studentUUID: string;
}
const ModalAssociationUpdate: React.FC<ModalAssociationUpdtProps> = ({ onValidate, show, studentUUID }) => {

    const [student, setStudent] = useState({
        FIRST_NAME:"",
        LAST_NAME:""
    });
    
    useEffect(()=>{
        const fetchData = async()=>{

            if(studentUUID){
                const _student = await getUserById(studentUUID);
                setStudent(_student.data);
                console.log("_student.data")
            }
        }
        fetchData();
    }, [studentUUID]);

    if (!show) return null;    return (
        <>
            <article className={'line w100 space-between ApprenticeshipManagementModal'}>
                <h2 className={'w100'}>Mettre à jour l'association</h2>

                <Row className="w100"> {/* Utilisation du composant Row de React Bootstrap */}
                    <Col xs={4}>
                        <div className={'line w100 items-center space-around'} id={'readOnly'}>
                            <input id={'studentKey'}
                                hidden={true}
                                value={studentUUID}
                            />
                            <h4>Etudiant : {student.FIRST_NAME} {student.LAST_NAME}</h4>
                        </div>
                    </Col>
                    <Col xs={4}>
                        <UserDropdown className={'w100'} id={'select-tutor'} usertype={'teacher'}/>

                    </Col>
                    <Col xs={4}>
                        <UserDropdown className={'w100'} id={'select-supervisor'} usertype={'supervisor'}/>
                    </Col>
                </Row>
                

                <div className={'line w100 space-around'}>
                    <Button className={'buttonGold txtCenter'}
                            name={'updateApprenticeshipAssociation'}
                            content={'Valider'}
                            onclick={ () => {
                                updateAssociationMock(
                                    (document.getElementById('studentKey') as HTMLSelectElement).value,
                                    (document.getElementById('select-tutor') as HTMLSelectElement).value,
                                    (document.getElementById('select-supervisor') as HTMLSelectElement).value
                                )
                                onValidate()
                            }
                    }
                    />
                </div>
            </article>
        </>
    )
}

export default ModalAssociationUpdate
