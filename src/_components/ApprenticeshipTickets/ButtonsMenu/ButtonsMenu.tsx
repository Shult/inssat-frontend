import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { UserInterface } from "../../User/User.interface";
import Button from "../../Clickable/Button";
import { Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { ListFollowStudent } from "../Services/apprenticeshipTickets.interface";

interface ButtonsMenuProps {
    listStudentSuivi: ListFollowStudent;
}



const ButtonsMenu: React.FC<ButtonsMenuProps> = ({ listStudentSuivi }) => {

    const navigate = useNavigate();

    const navigateToApprenticeshipTickets = (path: string) => {
        navigate(path);
    };

    return (
        <div className="container">
            <Row>
            {listStudentSuivi && Object.keys(listStudentSuivi).map((key, index) => (
                <Col>
                    <Button
                    key={index}
                    className={"buttonGold txtCenter "}
                    content={`${listStudentSuivi[key].student.FIRST_NAME} ${listStudentSuivi[key].student.LAST_NAME}`}
                    onclick={() => navigateToApprenticeshipTickets('/apprenticeshipTickets')}
                    />
                </Col>
                
            ))}
            </Row>
        </div>
    );
};

export default ButtonsMenu;
