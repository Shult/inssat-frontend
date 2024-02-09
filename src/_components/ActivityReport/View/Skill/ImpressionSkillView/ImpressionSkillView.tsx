import React, { useState } from 'react';
import { Row, Col, Button} from 'react-bootstrap';
import "./ImpressionSkillView.css"
import { Activity } from '../../../Services/interfaces';

interface ActivitySkillViewProps {
    activity: Activity;
}
function ImpressionSkillView(activityView : ActivitySkillViewProps) {
    const [buttonText, setButtonText] = useState('Non évalué');

    const getButtonColor = (text : any) => {
        switch (text) {
            case 'Excellent':
                return '#4caf50';
            case 'Très bien':
                return '#90ee90';
            case 'Bien':
                return '#b7f1b7';
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

    if(activityView.activity.impressions[0].level.id != 7){
        return(
            <Row>
                <Col xs={12} md={12} lg={9} xl={9}>
                    <p>{activityView.activity.name}</p>
                </Col>
                <Col xs={12} md={12} lg={3} xl={3}>
                    <>
                        <Button variant="primary" disabled id={'appreciation'} style={{ borderColor: getButtonColor(activityView.activity.impressions[0].level.name), color: getButtonColor(activityView.activity.impressions[0].level.name) }}>
                            {activityView.activity.impressions[0].level.name}
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
                    <p>{activityView.activity.name}</p>
                </Col>
                <Col xs={12} md={12} lg={8} xl={8}>
                    <p>{activityView.activity.impressions[0].content}</p>
                </Col>
                <hr className="separator" id={'separator'}/>
            </Row>
        )
    }
}

export default ImpressionSkillView;