import UserDropdown from '../../../_components/User/UserDropdown';
import Button from '../../../_components/Clickable/Button';

import {getUsersMock} from '../../../_components/User/User.api';
import {updateAssociationMock} from '../../../_components/User/ApprenticeshipAssociation/Association.mock';

import './ApprenticeshipManagement.modal.css'
import React from "react";
import {ModalUpdateAssociationProps} from "../../../_components/User/ApprenticeshipAssociation/Association.interface";

const ModalAssociationUpdate: React.FC<ModalUpdateAssociationProps> = ({ onValidate, show, studentUUID }) => {
    if (!show) return null;    return (
        <>
            <article className={'line w100 space-between ApprenticeshipManagementModal'}>
                <h2 className={'w100'}>Mettre à jour l'association</h2>

                <div className={'line w100 items-center space-around'} id={'readOnly'}>
                    <input id={'studentKey'}
                           hidden={true}
                           value={studentUUID}
                    />
                    <h6>Student : {getUsersMock('uuid', studentUUID)?.pop()?.firstname} {getUsersMock('uuid', studentUUID)?.pop()?.lastname}</h6>
                </div>
                <UserDropdown className={'w100'} id={'select-tutor'} usertype={'teacher'}/>
                <UserDropdown className={'w100'} id={'select-supervisor'} usertype={'supervisor'}/>

                <div className={'line w100 space-around'}>
                    <Button className={'buttonSuccess'}
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
