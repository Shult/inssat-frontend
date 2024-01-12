import React from "react";
import { Card, Col} from "react-bootstrap";

interface SuiviInfoCardProps {
    title: string;
    data: { lastname: string; firstname: string; email: string };
    style?: React.CSSProperties;
}

const SuiviInfoCard: React.FC<SuiviInfoCardProps> = ({ title, data, style }) => {
    return (
        <Col className="container">
            <Card >
                <Card.Body style={style}>
                    <Card.Title>{title}</Card.Title>
                    <ul>
                        <li>Nom : {data.lastname}</li>
                        <li>Prénom : {data.firstname}</li>
                        <li>Adresse mail : {data.email}</li>
                    </ul>
                </Card.Body>
            </Card>
        </Col>
    );
};

export default SuiviInfoCard;
