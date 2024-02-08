import React, {useEffect, useState} from "react";
import {CDBSidebarMenuItem} from "cdbreact";
import Modal from "../../../_components/Modal/Modal";

import Button from "../../../_components/Clickable/Button";
import ModalAssociationUpdate from "../Modal/ApprenticeshipManagement.modal.update";

import { getUsersMock } from "../../../_components/User/User.api";
import { deleteAssociationMock } from "../../../_components/User/ApprenticeshipAssociation/Association.api";

import "./ApprenticeshipManagement.table.css"
import {AssociationInterface, AssociationsInterface} from "../../../_components/User/ApprenticeshipAssociation/Association.interface";
import { getUserById } from "../../../_api/user";

const ApprenticeshipManagementTable = ({association} : any) => {

    const [student, setStudent] = useState({
        FIRST_NAME:"",
        LAST_NAME:""
    });
    const [tutor, setTutor] = useState({
        FIRST_NAME:"",
        LAST_NAME:""
    });
    const [ma, setMa] = useState({
        FIRST_NAME:"",
        LAST_NAME:""
    });


    useEffect(()=>{
        const fetchData = async()=>{

            if(association){
                const _student = await getUserById(association?.student_id);
                const _tutor = await getUserById(association?.tutor_id);
                const _ma = await getUserById(association?.ma_id);

                setStudent(_student.data);
                console.log("_student.data")

                if(_student.ok){
                    setStudent(_student.data);
                }
                if(_ma.ok){
                    setMa(_ma.data);
                }
                if(_tutor.ok){
                    setTutor(_tutor.data);
                }

            }
        }
        
        fetchData();
    }, [association]);





   

    return (
        <>
           
            
           { student && 
            <td>
                <div className={"line w100"}>
                    <p>{ student?.LAST_NAME }</p>
                    <p>{ student?.FIRST_NAME }</p>
                </div>
            </td>
            } 

           { tutor && 
            <td>
                <div className={"line w100"}>
                    <p>{ tutor?.LAST_NAME }</p>
                    <p>{ tutor?.FIRST_NAME }</p>
                </div>
            </td>
            }

           { ma && 
            <td>
                <div className={"line w100"}>
                    <p>{ ma?.LAST_NAME }</p>
                    <p>{ ma?.FIRST_NAME }</p>
                </div>
            </td>

           }

            

        </>
    )

  
}



export default ApprenticeshipManagementTable
