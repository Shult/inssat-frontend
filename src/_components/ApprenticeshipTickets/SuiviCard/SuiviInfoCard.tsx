import React from "react";
import { Card, Col} from "react-bootstrap";

interface SuiviInfoCardProps {
    title: string;
    data: { LAST_NAME: string; FIRST_NAME: string; EMAIL: string };
    style?: React.CSSProperties;
}

const SuiviInfoCard: React.FC<SuiviInfoCardProps> = ({ title, data, style }) => {
    return (
        <Col className="container">
            <Card >
                <Card.Body style={style}>
                    <Card.Title>{title}</Card.Title>
                    <ul>
                        <li>Nom : {data?.LAST_NAME}</li>
                        <li>Prénom : {data?.FIRST_NAME}</li>
                        <li>Adresse mail : {data?.EMAIL}</li>
                    </ul>
                </Card.Body>
            </Card>
        </Col>
    );
};

export default SuiviInfoCard;
