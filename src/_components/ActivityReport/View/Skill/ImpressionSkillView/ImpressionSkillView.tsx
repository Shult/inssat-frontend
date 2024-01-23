import React, { useState } from 'react';
import { Row, Col, Button, Form } from 'react-bootstrap';
import CustomButton from "../../../../ToolBox/Forms/ActionButton"
import "./ImpressionSkillView.css"
import { IActivity, IActivityApi, IImpression } from '../../../Services/activityReportInterfaces';
import activityReportData from "../../../Services/tmpData"

interface IImpressionProps {
    activity: IActivity;
    impression: IImpression;
}
interface ActivitySkillViewProps {
    activity: IActivityApi; // Cette interface doit correspondre à la structure de vos données section.
}
function ImpressionSkillView({activity} : ActivitySkillViewProps) {
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

    if(activity.impressions[0].level.name != "free_impression"){
        return(
            <Row>
                <Col xs={12} md={12} lg={9} xl={9}>
                    <p>{activity.name}</p>
                </Col>
                <Col xs={12} md={12} lg={3} xl={3}>
                    <>
                        <Button variant="primary" disabled id={'appreciation'} style={{ borderColor: getButtonColor(activity.impressions[0].level.name), color: getButtonColor(activity.impressions[0].level.name) }}>
                            {activity.impressions[0].level.name}
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
                    <p>{activity.impressions[0].content}</p>
                </Col>
                <hr className="separator" id={'separator'}/>
            </Row>
        )
    }
}

export default ImpressionSkillView;