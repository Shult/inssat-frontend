import React, { useState } from 'react';
import { Row, Col, Button, Form } from 'react-bootstrap';
// import "../../../ToolBox/styles.css"
// import Activity from "../Activity/Activity"
// import "./impression.css"
import CustomButton from "../../../../ToolBox/Forms/ActionButton"
import "./ImpressionSkillView.css"
import { IActivity, IImpression } from '../../../Services/activityReportInterfaces';
import activityReportData from "../../../Services/tmpData"

interface IImpressionProps {
    activity: IActivity;
    impression: IImpression;
}

function ImpressionSkillView({activity, impression} : any) {
    const [buttonText, setButtonText] = useState('Non évalué');


    // GetActicityBy (Student_id, Period_id, Activity_id) Pas sur
    const getButtonColor = (text : any) => {
        switch (text) {
            case 'Insuffisant':
                return '#E2807D';
            case 'Non évalué':
                return '#889795';
            // Ajoutez d'autres cas si nécessaire
            default:
                return '#BF9E4E';
        }
    };

    if(!activity.is_free){
        return(
            <Row>
                <Col xs={9}>
                    <p>{activity.name}</p>
                </Col>
                <Col xs={3}>
                    <>
                        <Button variant="primary" disabled id={'appreciation'} style={{ backgroundColor: getButtonColor(impression.level_id) }}>
                            {impression.level_id}
                        </Button>{' '}
                    </>
                </Col>
                <hr className="separator" id={'separator'}/>
            </Row>
        )
    } else{
        return(
            <Row>
                <Col xs={4}>
                    {/*<Activity activity={ activity.name }></Activity>*/}
                    <p>{activity.name}</p>
                </Col>
                <Col xs={8}>
                    <p>{impression.content}</p>
                </Col>
                <hr className="separator" id={'separator'}/>
            </Row>
        )
    }
}

export default ImpressionSkillView;