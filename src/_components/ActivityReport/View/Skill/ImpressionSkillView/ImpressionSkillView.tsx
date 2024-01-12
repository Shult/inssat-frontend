import React, { useState } from 'react';
import { Row, Col, Button, Form } from 'react-bootstrap';
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

    const getButtonColor = (text : any) => {
        switch (text) {
            case 'Excellent':
                return '#4caf50';
            case 'Très bien':
                return '#90ee90';
            case 'Bien':
                return '#2196f3';
            case 'Assez bien':
                return '#ffc107';
            case 'Passable':
                return '#ff9800';
            case 'Insuffisant':
                return '#f44336';
            case 'Non évaluable':
                return '#889795';
            default:
                return('#BF9E4E');
        }
    };

    if(!activity.is_free){
        return(
            <Row>
                <Col xs={12} md={12} lg={9} xl={9}>
                    <p>{activity.name}</p>
                </Col>
                <Col xs={12} md={12} lg={3} xl={3}>
                    <>
                        <Button variant="primary" disabled id={'appreciation'} style={{ borderColor: getButtonColor(impression.level_id), color: getButtonColor(impression.level_id) }}>
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
                <Col xs={12} md={12} lg={4} xl={4}>
                    {/*<Activity activity={ activity.name }></Activity>*/}
                    <p>{activity.name}</p>
                </Col>
                <Col xs={12} md={12} lg={8} xl={8}>
                    <p>{impression.content}</p>
                </Col>
                <hr className="separator" id={'separator'}/>
            </Row>
        )
    }
}

export default ImpressionSkillView;