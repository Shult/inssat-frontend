import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { UserInterface } from "../../User/User.interface";
import Button from "../../Clickable/Button";
import { Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

interface ButtonsMenuProps {
    listStudentSuivi: UserInterface[];
}



const ButtonsMenu: React.FC<ButtonsMenuProps> = ({ listStudentSuivi }) => {

    const navigate = useNavigate();

    const navigateToApprenticeshipTickets = (path: string) => {
        navigate(path);
    };

    return (
        <div className="container">
            <Row>
            {listStudentSuivi.map((student, index) => (
                <Col>
                    <Button
                    key={index}
                    className={"buttonGold txtCenter "}
                    content={`${student.firstname} ${student.lastname}`}
                    onclick={() => navigateToApprenticeshipTickets('/apprenticeshipTickets')}
                    />
                </Col>
                
            ))}
            </Row>
        </div>
    );
};

export default ButtonsMenu;
