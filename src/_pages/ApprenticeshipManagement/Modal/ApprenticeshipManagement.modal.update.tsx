import UserDropdown from '../../../_components/User/UserDropdown';
import Button from '../../../_components/Clickable/Button';

import './ApprenticeshipManagement.modal.css'

import React from "react";
import {ModalUpdateAssociationProps} from "../../../_components/User/ApprenticeshipAssociation/Association.interface";
import {updateAssociation} from "../../../_components/User/ApprenticeshipAssociation/Association.api";
import {GROUP_ID_SUPERVISOR, GROUP_ID_TUTOR} from "../../../_helpers/constantes";

const ModalAssociationUpdate: React.FC<ModalUpdateAssociationProps> = ({ onValidate, show, idAssociation, student }) => {
    if (!show) return null;

    return (
        <>
            <article className={'line w100 space-between ApprenticeshipManagementModal'}>
                <h2 className={'w100'}>Mettre à jour l'association</h2>

                <div className={'line w100 items-center space-around'} id={'readOnly'}>
                    <input id={'studentKey'}
                           hidden={true}
                           value={student.uuid}
                    />
                    <h6>Student : {student.firstname} {student?.lastname}</h6>
                </div>
                <UserDropdown className={'w100'} id={'select-tutor'} usertype={GROUP_ID_TUTOR}/>
                <UserDropdown className={'w100'} id={'select-supervisor'} usertype={GROUP_ID_SUPERVISOR}/>

                <div className={'line w100 space-around'}>
                    <Button className={'buttonSuccess'}
                            name={'updateApprenticeshipAssociation'}
                            content={'Valider'}
                            onclick={ () => {
                                updateAssociation([
                                    idAssociation,
                                    (document.getElementById('studentKey') as HTMLSelectElement).value,
                                    (document.getElementById('select-tutor') as HTMLSelectElement).value,
                                    (document.getElementById('select-supervisor') as HTMLSelectElement).value
                                ])
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
